FROM node:16

WORKDIR /frontend

COPY package*.json .

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE $FRONTEND_DOCKER_PORT

USER node

CMD [ "pm2-runtime", "npm", "--", "start" ]