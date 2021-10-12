# API Tesing setup

#### Setup
1. Make a new branch from express_api_dev
2. Move the feature card in Flying Donut and assign yourself.


#### Local 
###### Docker - MONGODB & Nodemon

1. Update the certificates folder to include the ca-certificate.crt.

2. Update the .env file in the /app/mongo-api/ dir to newest .env file.
   
3. From the /app dir run:
    ```bash
    npm install --also=dev
    ```

4. To start the docker container for a local mongodb instance run:
    ```bash
    docker-compose up -d --no-deps --build mongodb
    ```

6. Confirm the container has started by running:
    ```bash
    docker ps
    ```

7. Update the NODE_ENV var in the .env file to the following:
    ```makefile
    NODE_ENV=local
    ``` 
8.  From within the /app/mongo-api/ run: 
    ```bash
    npm i --also=dev
    ```

11. Start the API server from the /app/mongo-api/ dir with:
    ```bash
    nodemon ./index.js
    ```

#### Development
###### Digital Ocean
1. Update the certificates folder to include the ca-certificate.crt.

2. Update the .env file in the /app/mongo-api/ dir to newest .env file.
   
3. Update the NODE_ENV var in the .env file to the following:
    ```makefile
    NODE_ENV=development
    ```
4. From within the /app/mongo-api/ run: 
   ```bash
   npm i --also=dev
   ```

5. Start the API server from the /app/mongo-api/ dir with:
    ```
    nodemon ./index.js
    ```