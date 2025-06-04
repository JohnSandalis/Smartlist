FROM node:23 AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json tsconfig.base.json ./

# Copy all packages needed by backend with their configs
COPY packages/shared/types/package.json packages/shared/types/tsconfig.json ./packages/shared/types/
COPY packages/shared/types/src ./packages/shared/types/src
COPY packages/shared/schemas/package.json packages/shared/schemas/tsconfig.json ./packages/shared/schemas/
COPY packages/shared/schemas/src ./packages/shared/schemas/src

# Copy backend source and package.json
COPY apps/backend ./apps/backend

# Install dependencies
RUN cd /app && npm install && \
    cd /app/apps/backend && npm install

# Build shared packages first
RUN cd /app/packages/shared/types && npm run build && \
    cd /app/packages/shared/schemas && npm run build && \
    cd /app/apps/backend && npm run build

# === Production image ===
FROM node:23

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy backend package.json and built dist
COPY apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist/apps/backend/src ./apps/backend/dist

# Copy built shared packages
COPY --from=builder /app/packages/shared/types/dist ./packages/shared/types/dist
COPY --from=builder /app/packages/shared/schemas/dist ./packages/shared/schemas/dist
COPY packages/shared/types/package.json ./packages/shared/types/package.json
COPY packages/shared/schemas/package.json ./packages/shared/schemas/package.json

# Install production dependencies
RUN cd /app && npm install --omit=dev

CMD ["npm", "--workspace=apps/backend", "start"]
