# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# next/font fetches and self-hosts the faces here, so the build needs network.
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
# `standalone` carries only the server and the modules it actually imports.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# The ISR cache lives here. Without a volume on this path every container
# restart regenerates every page cold.
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

# The catalog is read from disk at runtime, not compiled into the bundle, so
# ingestion can update it without a rebuild. A named volume mounted here is
# seeded from these files the first time it is created.
COPY --from=builder --chown=nextjs:nodejs /app/lib/catalog.json /app/lib/shots.json /app/lib/fandom.json /app/lib/covers.json ./data/
ENV DATA_DIR=/app/data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/en').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
