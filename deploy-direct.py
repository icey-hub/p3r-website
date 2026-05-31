#!/usr/bin/env python3
import paramiko
import os
import sys
import time

SSH_HOST = "192.168.60.100"
SSH_USER = "icey"
SSH_PASS = "admin"
REMOTE_DIR = "/home/icey/p3r-website"

def run_command(client, command, timeout=120):
    """Execute a command and return output"""
    print(f"\n>>> {command}")
    stdin, stdout, stderr = client.exec_command(command, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    exit_code = stdout.channel.recv_exit_status()
    if out:
        print(out.rstrip())
    if err:
        print(err.rstrip(), file=sys.stderr)
    return exit_code, out, err

def upload_directory(sftp, local_dir, remote_dir):
    """Recursively upload directory"""
    print(f"\nUploading {local_dir} -> {remote_dir}")

    # Create remote directory
    try:
        sftp.mkdir(remote_dir)
    except IOError:
        pass

    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        remote_path = f"{remote_dir}/{item}"

        # Skip certain directories
        if item in ['node_modules', '.next', '.git', '.claude', '__pycache__', 'deploy.py', 'deploy-direct.py']:
            continue

        if os.path.isdir(local_path):
            upload_directory(sftp, local_path, remote_path)
        else:
            print(f"  Uploading: {item}")
            sftp.put(local_path, remote_path)

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        print(f"Connecting to {SSH_HOST}...")
        client.connect(SSH_HOST, username=SSH_USER, password=SSH_PASS, timeout=10)
        print("Connected!")

        # Clean up old deployment
        print("\nCleaning up old deployment...")
        run_command(client, f"rm -rf {REMOTE_DIR}")

        # Upload files via SFTP
        print("\nUploading project files...")
        sftp = client.open_sftp()
        upload_directory(sftp, os.getcwd(), REMOTE_DIR)
        sftp.close()
        print("Upload complete!")

        # Check Node.js version (need 18+)
        print("\nChecking Node.js version...")
        run_command(client, "node --version")

        # Install dependencies
        print("\nInstalling dependencies (this may take a few minutes)...")
        exit_code, out, err = run_command(client, f"cd {REMOTE_DIR} && npm install", timeout=300)
        if exit_code != 0:
            print("npm install failed!")
            return

        # Build project
        print("\nBuilding project...")
        exit_code, out, err = run_command(client, f"cd {REMOTE_DIR} && npm run build", timeout=300)
        if exit_code != 0:
            print("Build failed!")
            return

        # Kill any existing next server
        run_command(client, "pkill -f 'next' 2>/dev/null || true")
        time.sleep(2)

        # Start dev server in background
        print("\nStarting dev server on port 3000...")
        run_command(client, f"cd {REMOTE_DIR} && nohup npm run dev -- -H 0.0.0.0 > /tmp/p3r-dev.log 2>&1 &")
        time.sleep(5)

        # Check if server started
        print("\nChecking server status...")
        run_command(client, "ps aux | grep next | grep -v grep")
        run_command(client, "cat /tmp/p3r-dev.log 2>/dev/null | tail -30")

        # Check if port 3000 is listening
        run_command(client, "ss -tlnp | grep 3000 || netstat -tlnp | grep 3000")

        print("\n" + "="*60)
        print("Deployment complete!")
        print(f"Dev server should be running at: http://{SSH_HOST}:3000")
        print("="*60)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    main()
