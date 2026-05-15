
[group('JS')]
install *flags:
    pnpm install {{ flags }}

[group('JS')]
run script *flags:
    pnpm run {{ script }} {{ flags }}


[group('JS')]
add pkg *flags:
    pnpm add {{ pkg }} {{ flags }}

[group('JS')]
clear:
    @echo "Cleaning project..."
    rm -rf node_modules pnpm-lock.yaml

[group('JS-Frameworks')]
js-adonis name *flags:
    pnpm create adonisjs@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-vite name *flags:
    pnpm create vite {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-astro name *flags:
    pnpm create astro@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-elysia name *flags:
    pnpm create elysia {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-fastify name *flags:
    pnpm create fastify {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-next name *flags:
    pnpm create next-app {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-remix name *flags:
    pnpm create remix@latest {{ name }} {{ flags }}

[group('JS-Frameworks')]
js-hono name *flags:
    pnpm create hono {{ name }} {{ flags }}