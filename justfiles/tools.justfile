[group('Setup')]
install-rust:
    @echo "Instalando Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

[group('Setup')]
install-node:
    @echo "Instalando Node.js (via fnm)..."
    curl -fsSL https://fnm.vercel.app/install | bash
    @echo "Nota: Necesitarás ejecutar 'fnm install --lts' después de reiniciar la terminal."

[group('Setup')]
install-bun:
    @echo "Instalando Bun..."
    curl -fsSL https://bun.sh/install | bash

[group('Setup')]
install-pnpm:
    @echo "Instalando pnpm..."
    brew install pnpm
