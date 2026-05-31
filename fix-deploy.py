#!/usr/bin/env python3
import paramiko
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

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        print(f"Connecting to {SSH_HOST}...")
        client.connect(SSH_HOST, username=SSH_USER, password=SSH_PASS, timeout=10)
        print("Connected!")

        # Install Node.js 20.x using NodeSource
        print("\n" + "="*60)
        print("Upgrading Node.js to v20.x...")
        print("="*60)

        # Download and run NodeSource setup script
        run_command(client, "curl -fsSL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh", timeout=60)
        run_command(client, "sudo -S bash /tmp/nodesource_setup.sh", timeout=60)

        # Install Node.js 20
        run_command(client, "sudo apt-get install -y nodejs", timeout=180)

        # Verify installation
        print("\nVerifying Node.js installation...")
        run_command(client, "node --version")
        run_command(client, "npm --version")

        # Clean up and reinstall dependencies
        print("\nReinstalling dependencies...")
        run_command(client, f"cd {REMOTE_DIR} && rm -rf node_modules package-lock.json")
        run_command(client, f"cd {REMOTE_DIR} && npm install", timeout=300)

        # Build project
        print("\nBuilding project...")
        exit_code, out, err = run_command(client, f"cd {REMOTE_DIR} && npm run build", timeout=300)
        if exit_code != 0:
            print("Build failed! Checking error...")
            run_command(client, f"cd {REMOTE_DIR} && cat .next/trace 2>/dev/null | tail -50")
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
