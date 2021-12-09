# UCD Digital Davis Initiative 
### California State Univeristy - Computer Science Senior Project
###### Forked from [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^14.17.6
- [npm](https://nodejs.org/en/download/package-manager/)
- [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker-Compose](https://docs.docker.com/compose/install/)


## Installing Dependancies with NPM
1. From /app/frontend/
2. ```npm install ```
3. From /app/mongo-api/
4. ``` npm install ```

## Updating .env vars 
1. Add new .env file to /app/mongo-api/
2. Inside of /app/mongo-api/config/ add .env via dotenv package

## Building the Frontend with Expo
1. From the /app/frontend dir
2. ``` npm start ```

## Deploy Locally with Docker Compose
1. ``` docker network create --subnet 172.23.0.0/16 dev_network ```
2. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build -d --remove-orphans mongo-database```
3. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api```

## Deploy to Container Registry with Docker Compose 
1. Select Production docker compose file
2. ```docker-compose -f docker-compose.prod.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api```
3. Follow the steps from you cloud provider to push an image to a container registry

## Running Tests with JEST
1. Database must be started
2. From  /app/mongo-api/
3. ``` npm run test ```


## Package Structure
```
└───app
    ├───.expo-shared
    ├───frontend
    │   ├───.expo
    │   ├───.expo-shared
    │   ├───assets
    │   └───src
    │       ├───axios
    │       ├───navigators
    │       ├───screens
    │       │   ├───challengesScreen
    │       │   │   └───components
    │       │   │       └───banners
    │       │   ├───formularyScreen
    │       │   ├───insightsScreen
    │       │   ├───knowledgeScreen
    │       │   ├───Profile
    │       │   │   └───components
    │       │   ├───searchScreen
    │       │   └───userScreen
    │       └───sharedComponent
    ├───mongo-api
    │   ├───certificates
    │   ├───config
    │   ├───controllers
    │   ├───middleware
    │   ├───models
    │   │   └───plugins
    │   ├───public
    │   ├───routes
    │   ├───services
    │   ├───tests
    │   │   ├───fixtures
    │   │   ├───integration
    │   │   └───utils
    │   │       └───models
    │   ├───utils
    │   └───validate
    └───mongo-db
```

## Known issues
1. Frontend cannot be built with expo in a emulated enviroment - Requires Native CLI
