# Stage 1
FROM node:16 as build-stage

WORKDIR /backend
COPY package.json .


RUN npm install
COPY . .

RUN npm run --openssl-legacy-provider build

# Stage 2
FROM nginx:1.17.0-alpine

COPY --from=build-stage /backend/build /usr/share/nginx/html/admin
EXPOSE $BACKEND_DOCKER_PORT

# Stage 3
FROM nginx:1.17.0-alpine
RUN rm /etc/nginx/conf.d/*

COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD nginx -g 'daemon off;'