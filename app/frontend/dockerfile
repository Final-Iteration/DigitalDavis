FROM node:14.17.6

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

# Install the application's dependencies into the node_modules's cache directory.
COPY package*.json ./
RUN npm install --also=dev

# Create and define the application's working directory.
WORKDIR /usr/src/app

# RUN npm install --global expo-cli --save-dev
