# Variable de entorno (por defecto local)
env := "local"

# Rutas de archivos
docker_path := "infra/docker/docker-compose.yml"
docker_override_path := "infra/docker/docker-compose.local.yml"

# Lógica de selección de archivo: Si env es prod usa docker_path, si no, el override.
compose_file := if env == "prod" { docker_path } else { docker_override_path }

# --- Infrastructure Management ---

# Start containers in the background (Uso: just env=prod up)
[group('Docker')]
up:
    @echo "Ejecutando en modo: {{ env }} con el archivo {{ compose_file }}"
    docker compose -f {{ compose_file }} up -d

# Stop and remove containers, networks, and images
[group('Docker')]
down:
    docker compose -f {{ compose_file }} down

# Restart the entire environment
[group('Docker')]
restart:
    just env={{ env }} down
    just env={{ env }} up

# Follow log output from services
[group('Docker')]
logs:
    docker compose -f {{ compose_file }} logs -f

# Procesos contenedores
[group('Docker')]
ps:
    docker compose -f {{ compose_file }} ps

# Listar contenedores
[group('Docker')]
ls:
    docker compose -f {{ compose_file }} ls

# Remove unused data
[group('Docker')]
clean:
    docker system prune -f
    docker image prune -f

# --- Execution & Interaction ---

# Open a shell inside a service container
[group('Docker')]
shell service='app':
    docker compose -f {{ compose_file }} exec {{ service }} sh

# Display real-time resource usage statistics
[group('Docker')]
stats:
    docker stats

# --- Build & Registry ---

# Build images from scratch without using cache
[group('Docker')]
build-nocache:
    docker compose -f {{ compose_file }} build --no-cache

# Dangerous: Remove everything to start fresh
[group('Docker')]
nuke:
    docker compose -f {{ compose_file }} down -v --rmi all --remove-orphans