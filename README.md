# UCD Digital Davis Initiative - Nirvana

![UCD_works_12](https://user-images.githubusercontent.com/61564689/156504609-99b55ab8-a175-439e-be41-b74b3d99e7e9.png)

## Project Homepage
[Nirvana](https://fi-nirvana.netlify.app/)
<img src="https://fi-nirvana.netlify.app/static/media/logo.524f9483.png" align="right"
     alt="Lotus logo by Freepik" width="145" height="120">

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3) ^5.0
- [Node](https://nodejs.org/en/download/) ^14.17.6
- [NPM](https://nodejs.org/en/download/package-manager/) ^6.14.15
- [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install)
- [Ubuntu](https://ubuntu.com/wsl) ^18.04.6 LTS
- [Docker](https://www.docker.com/products/docker-desktop) ^20.10.8
- [Docker Compose](https://docs.docker.com/compose/install/) ^3.8

## Installing Dependencies with NPM
1. From /app/frontend/
2. ```npm install ```
3. From /app/api/
4. ``` npm install ```

## Updating .env vars 
1. Add new .env file to /app/api/
2. Inside of /app/api/config/ add .env via dotenv package

## Building the Frontend with Expo
1. From the /app/frontend dir
2. ``` npm start ```

## Deploy Locally with Docker Compose
1. ``` docker network create --subnet 172.23.0.0/16 dev_network ```
2. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./api/.env up --no-deps --build -d --remove-orphans mongo-database```
3. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./api/.env up --no-deps --build --remove-orphans express-api```

## Deploy to Container Registry with Docker Compose 
1. Select Production docker compose file
2. ```docker-compose -f docker-compose.prod.yml --project-name final_iteration --env-file ./api/.env up --no-deps --build --remove-orphans express-api```
3. Follow the steps from you cloud provider to push an image to a container registry

## Running Tests with JEST
1. Database must be started
2. From  /app/api/
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
    ├───api
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
    └───database
```
## Developers 
Final Iteration - California State University, Sacramento - CS Senior Project Team
1. **Akasha Stallworth**: [Github](https://github.com/akxsha) - [LinkedIn](https://www.linkedin.com/in/akasha-stallworth-75a458160/)
2. **Daniel Olsen**: [Github](https://github.com/BotOlsen) - [LinkedIn](https://www.linkedin.com/in/olsend/)
3. **Dennis Worley Jr.**: [Github](https://github.com/dennisw95) - [LinkedIn](https://www.linkedin.com/in/dennis-worley-jr-4ab98b187/)
4. **Gustav Boyd**: [Github](https://github.com/gustavboyd) - [LinkedIn](https://www.linkedin.com/in/gustav-boyd/)
5. **Joshua Poe**: [Github](https://github.com/icarus44-zer0) - [LinkedIn](https://www.linkedin.com/in/joshua-poe/)
6. **Manh Sy**: [Github](https://github.com/Manhsy) - [LinkedIn](https://www.linkedin.com/in/manh-sy/)
7. **Sahira Rizvi**: [Github](https://github.com/sahirar) - [LinkedIn](https://www.linkedin.com/in/sahira-rizvi/)
8. **Sharon Fitzpatrick**: [Github](https://github.com/2320sharon) - [LinkedIn](https://www.linkedin.com/in/sharon-fitzpatrick-9088b31b3)

## API
Forked from [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)

## Known Issues
1. Frontend cannot be built with expo in a emulated environment - Requires Native CLI
