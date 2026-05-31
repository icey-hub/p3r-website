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
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    if out:
        try:
            print(out.rstrip())
        except UnicodeEncodeError:
            print(out.rstrip().encode('ascii', 'replace').decode('ascii'))
    if err:
        try:
            print(err.rstrip(), file=sys.stderr)
        except UnicodeEncodeError:
            print(err.rstrip().encode('ascii', 'replace').decode('ascii'), file=sys.stderr)
    return exit_code, out, err

def main():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        print(f"Connecting to {SSH_HOST}...")
        client.connect(SSH_HOST, username=SSH_USER, password=SSH_PASS, timeout=10)
        print("Connected!")

        # Check Node.js version
        print("\nChecking Node.js version...")
        run_command(client, "node --version")
        run_command(client, "npm --version")

        # Build project
        print("\nBuilding project...")
        exit_code, out, err = run_command(client, f"cd {REMOTE_DIR} && npm run build", timeout=300)

        if exit_code != 0:
            print(f"\nBuild failed with exit code {exit_code}!")
            # Check build output for errors
            run_command(client, f"cd {REMOTE_DIR} && cat .next/trace 2>/dev/null | tail -50")
            return

        print("\nBuild successful!")

        # Kill any existing next server
        print("\nStopping existing servers...")
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
