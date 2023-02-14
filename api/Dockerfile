FROM node:16

RUN npm install --global pm2

WORKDIR /api

COPY package*.json .

RUN npm install --production

COPY . .

RUN npm seed

CMD npm start