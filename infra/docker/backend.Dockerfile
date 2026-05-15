FROM node:lts-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps AS build
WORKDIR /app

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    NODE_OPTIONS="--max-old-space-size=512" \
    pnpm exec node ace build --ignore-ts-errors

FROM build AS pruned
RUN pnpm prune --prod

FROM base AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/build ./
COPY --from=pruned /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/swagger.yml ./swagger.yml

EXPOSE 3333

CMD ["node", "bin/server.js"]