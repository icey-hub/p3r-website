#!/usr/bin/env python3
import paramiko
import sys
import time

SSH_HOST = "192.168.60.100"
SSH_USER = "icey"
SSH_PASS = "admin"

def run_ssh_command(client, command, timeout=60):
    """Execute a command and return output"""
    print(f"\n>>> {command}")
    stdin, stdout, stderr = client.exec_command(command, timeout=timeout)
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    exit_code = stdout.channel.recv_exit_status()
    if out:
        print(out)
    if err:
        print(err, file=sys.stderr)
    return exit_code, out, err

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        print(f"Connecting to {SSH_HOST}...")
        client.connect(SSH_HOST, username=SSH_USER, password=SSH_PASS, timeout=10)
        print("Connected!")

        # Check environment
        run_ssh_command(client, "uname -a")
        run_ssh_command(client, "node --version 2>/dev/null || echo 'Node.js not installed'")
        run_ssh_command(client, "npm --version 2>/dev/null || echo 'npm not installed'")

        # Clone or update repo
        repo_url = "https://github.com/icey-hub/p3r-website.git"
        deploy_dir = "~/p3r-website"

        exit_code, out, err = run_ssh_command(client, f"test -d {deploy_dir} && echo 'EXISTS' || echo 'NOT_EXISTS'")

        if "NOT_EXISTS" in out:
            print("\nCloning repository...")
            run_ssh_command(client, f"git clone {repo_url} {deploy_dir}", timeout=120)
        else:
            print("\nRepository exists, pulling latest...")
            run_ssh_command(client, f"cd {deploy_dir} && git pull")

        # Install dependencies
        print("\nInstalling dependencies...")
        run_ssh_command(client, f"cd {deploy_dir} && npm install", timeout=180)

        # Build project
        print("\nBuilding project...")
        run_ssh_command(client, f"cd {deploy_dir} && npm run build", timeout=180)

        # Kill any existing dev server
        run_ssh_command(client, "pkill -f 'next' 2>/dev/null || true")
        time.sleep(1)

        # Start dev server in background
        print("\nStarting dev server...")
        run_ssh_command(client, f"cd {deploy_dir} && nohup npm run dev -- -H 0.0.0.0 > /tmp/p3r-dev.log 2>&1 &")
        time.sleep(3)

        # Check if server started
        run_ssh_command(client, "ps aux | grep next | grep -v grep")
        run_ssh_command(client, "cat /tmp/p3r-dev.log 2>/dev/null | tail -20")

        print("\n" + "="*50)
        print("Deployment complete!")
        print(f"Dev server should be running at: http://{SSH_HOST}:3000")
        print("="*50)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    finally:
        client.close()

if __name__ == "__main__":
    main()
