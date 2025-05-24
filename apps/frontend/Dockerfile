FROM node:23

WORKDIR /app

# Copy root files and frontend workspace
COPY package.json package-lock.json tsconfig.base.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/frontend ./apps/frontend

# Copy shared types (or any other workspace you import from)
COPY packages/types ./packages/types

# Install dependencies only for frontend
RUN npm install --workspace=apps/frontend

# Build the frontend
RUN npm run --workspace=apps/frontend build

CMD ["npm", "--workspace=apps/frontend", "start"]
