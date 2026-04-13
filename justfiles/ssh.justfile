# SSH Module Variables

ssh_key := "~/.ssh/prod_key"
prod_ip := "123.45.67.89"
stg_ip := "10.0.5.21"
db_user := "db_admin"

# --- Recipes ---

# Connect to the production server
[group('Ssh')]
prod:
    ssh user@{{ prod_ip }} -i {{ ssh_key }}

# Connect to the staging environment
[group('Ssh')]
staging:
    ssh developer@{{ stg_ip }}

# Tunnel: Map remote database port to local port
[group('Ssh')]
tunnel-db local_port='5433' remote_port='5432':
    ssh -N -L {{ local_port }}:localhost:{{ remote_port }} user@{{ prod_ip }}

# Copy your local SSH public key to a new server
[group('Ssh')]
setup-key server_ip user='root':
    ssh-copy-id {{ user }}@{{ server_ip }}
