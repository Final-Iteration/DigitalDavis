FROM node:14.17.6


WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/app
RUN npm install

WORKDIR /usr/src/app/app/

RUN npm install 
RUN npm install --global expo-cli 
# RUN npm install react-native
# RUN npm install metro-bundler
# RUN npm install react-native-screens

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD expo start
