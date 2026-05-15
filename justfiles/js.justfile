pkg_manager := "pnpm"
runtime     := "node"

x := if pkg_manager == "npm" { "npx" } else if pkg_manager == "bun" { "bunx" } else { "deno run -A" }

[group('JS')]
js-install *flags:
    {{ pkg_manager }} install {{ flags }}

[group('JS')]
js-run script *flags:
    {{ runtime }} run {{ flags }} {{ script }}

[group('JS')]
js-test *flags:
    {{ runtime }} test {{ flags }}

[group('JS')]
js-add pkg *flags:
    @if [ "{{ pkg_manager }}" = "npm" ]; then \
        npm install {{ pkg }} {{ flags }}; \
    else \
        {{ pkg_manager }} add {{ pkg }} {{ flags }}; \
    fi

[group('JS')]
js-clear:
    @echo "Cleaning project..."
    rm -rf node_modules bun.lockb package-lock.json deno.lock

[group('JS-Frameworks')]
js-adonis name *flags:
    @echo "Scaffolding AdonisJS..."
    {{ x }} create-adonisjs@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-vite name *flags:
    @echo "Scaffolding ViteJS..."
    {{ x }} create-vite {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-astro name *flags:
    @echo "Scaffolding Astro..."
    {{ x }} create-astro@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-elysia name *flags:
    @echo "Scaffolding Elysia..."
    {{ x }} create-elysia {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-fastify name *flags:
    @echo "Scaffolding Fastify..."
    {{ x }} create-fastify {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-next name *flags:
    @echo "Scaffolding Next.js..."
    {{ x }} create-next-app {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-remix name *flags:
    @echo "Scaffolding Remix..."
    {{ x }} create-remix@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-hono name *flags:
    @echo "Scaffolding Hono..."
    {{ x }} create-hono {{ name }} {{ flags }}
