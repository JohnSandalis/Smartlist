FROM node:23 AS builder

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json tsconfig.base.json ./

# Copy all packages needed by backend
COPY packages/types ./packages/types

# Copy backend source and package.json
COPY apps/backend ./apps/backend

# Install all dependencies and link local packages properly
RUN npm install

# Build backend
RUN npm run --workspace=apps/backend build


# === Production image ===
FROM node:23

WORKDIR /app

# Copy root package files
COPY package.json package-lock.json ./

# Copy backend package.json and built dist
COPY apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Copy local packages needed at runtime (if any)
COPY packages/types ./packages/types

# Install only production dependencies (no dev)
RUN npm install --workspace=apps/backend --omit=dev

CMD ["npm", "--workspace=apps/backend", "start"]
