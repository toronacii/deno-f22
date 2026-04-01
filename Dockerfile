# ─── Stage 1: Build web ──────────────────────────────────────────────────────
FROM node:22-alpine AS web-builder

WORKDIR /build

# Install dependencies first (better layer caching)
COPY web/package.json web/package-lock.json ./web/
RUN npm ci --prefix web

# Copy web source + core (vite resolves @core → ../core at build time)
COPY web/ ./web/
COPY core/ ./core/

RUN npm run build --prefix web

# ─── Stage 2: Runtime (Deno) ─────────────────────────────────────────────────
FROM denoland/deno:2.3.1

WORKDIR /app

# Copy API source
COPY api/ ./api/

# Copy core library (referenced as ../core from api/)
COPY core/ ./core/

# Copy built frontend
COPY --from=web-builder /build/web/dist ./web/dist/

# Pre-cache all Deno dependencies (avoids cold-start downloads)
RUN deno cache --config api/deno.json api/main.ts

EXPOSE 8000

CMD ["deno", "run", "--allow-read", "--allow-net", "--allow-env", "api/main.ts"]
