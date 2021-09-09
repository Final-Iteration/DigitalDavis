FROM node:16.8.0
LABEL version=1.1.0

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/app/frontend/wellness

ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.132
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

RUN npm install \
    npm install --global expo-cli \
    npm install react-native \
    npm install metro-bundler \
    npm install react-native-screens@3.4.0

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD expo start

