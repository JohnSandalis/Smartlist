FROM node:23

WORKDIR /app

# Copy metadata
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/types/package.json ./packages/types/

# Install deps (cached)
RUN npm install --workspace=apps/frontend

# Copy source
COPY apps/frontend ./apps/frontend
COPY packages/types ./packages/types

# Wait for backend, then build and start
CMD sh -c "until curl -s http://backend:8080/categories > /dev/null; do echo 'Waiting for backend...'; sleep 2; done && npm run --workspace=apps/frontend build && npm run --workspace=apps/frontend start"

