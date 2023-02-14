# Stage 1
FROM node:14 as build-stage

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .

RUN npm run --openssl-legacy-provider build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /backend/build /usr/share/nginx/html
EXPOSE $BACKEND_DOCKER_PORT

CMD nginx -g 'daemon off;'