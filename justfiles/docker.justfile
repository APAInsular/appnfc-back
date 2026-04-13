docker_path := "infra/docker/docker-compose.yml"

# --- Infrastructure Management ---

# Start containers in the background
[group('Docker')]
up:
    docker compose -f {{ docker_path }} up -d

# Stop and remove containers, networks, and images created by up
[group('Docker')]
down:
    docker compose -f {{ docker_path }} down


# Restart the entire environment
[group('Docker')]
restart:
    just down
    just up

# Follow log output from services
[group('Docker')]
logs:
    docker compose -f {{ docker_path }} logs -f

# Procesos contenedores
[group('Docker')]
ps:
    docker compose -f {{ docker_path }} ps

# Listar contenedores
[group('Docker')]
ls:
    docker compose -f {{ docker_path }} ls

# Remove unused data (containers, networks, images)
[group('Docker')]
clean:
    docker system prune -f
    docker image prune -f

# --- Execution & Interaction ---

# Open a shell inside a service container (usage: just shell app)
[group('Docker')]
shell service='app':
    docker compose exec {{ service }} sh

# Display real-time resource usage statistics of containers
[group('Docker')]
stats:
    docker stats

# --- Build & Registry ---

# Build images from scratch without using cache
[group('Docker')]
build-nocache:
    docker compose -f {{ docker_path }} build --no-cache

# Dangerous: Remove everything (volumes, images, orphans) to start fresh
[group('Docker')]
nuke:
    docker compose -f {{ docker_path }} down -v --rmi all --remove-orphans