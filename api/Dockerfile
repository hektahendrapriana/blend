FROM node:16

WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
RUN npm seed
CMD npm start