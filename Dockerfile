FROM node:14.17.6-alpine3.14

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/app/

RUN npm install 
RUN npm install --global expo-cli 

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD expo start
