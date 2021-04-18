# Build
FROM node:14.15.4-alpine3.12 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Release
FROM node:14.15.4-alpine3.12 AS release
RUN npm install -g sequelize-cli
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD [ "node", "./app.js" ]