# Digital Davis 

### Package Structure
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
### Installing Dependancies with NPM
1. From /app/frontend/
2. ```npm install ```
3. From /app/mongo-api/
4. ``` npm install ```

### Starting the Frontend 
1. From the /app/frontend dir
2. ``` npm start ```

### Deploy "Dev" Locally with Docker Compose
1. ``` docker network create --subnet 172.23.0.0/16 dev_network ```
2. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build -d --remove-orphans mongo-database```
3. ``` docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api```

### Deploy "Prod" with Docker Compose and Cloud Registry
1. Select Production docker compose file
2. ```docker-compose -f docker-compose.prod.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api```
3. Follow the steps from you cloud provider to push an image to a container registry

### Updating .env vars 
1. Add new .env file to /app/mongo-api/
2. Inside of /app/mongo-api/config/ add .env import via process.get 
