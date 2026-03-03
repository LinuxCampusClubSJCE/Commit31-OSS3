FROM node:20-alpine

WORKDIR /app

# Copy dependency files with correct ownership
COPY --chown=node:node package*.json ./

# Install dependencies deterministically
RUN npm ci

# Copy the rest of the application source
COPY --chown=node:node . .

# Expose backend port
EXPOSE 5000

# Drop root privileges
USER node

# Start development server
CMD ["npm", "run", "dev"]