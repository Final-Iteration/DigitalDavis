FROM node:14.17.6-alpine3.13
WORKDIR /usr/src/cache

COPY ./package*.json ./
RUN npm i --also=dev

RUN mkdir -p /usr/src/app

COPY ./ /usr/src/app

WORKDIR /usr/src/app
COPY . ./ 

CMD node ./index.js