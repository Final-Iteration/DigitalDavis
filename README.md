# UCD Employee Wellness Application 

# Package Structure
```
    └───spring2021_final-iteration
        ├───app
        │   ├───.expo-shared
        │   ├───frontend
        │   │   ├───.expo-shared
        │   │   ├───assets
        │   │   └───src
        │   │       ├───navigators
        │   │       ├───screens
        │   │       │   ├───challengesScreen
        │   │       │   │   └───components
        │   │       │   ├───formularyScreen
        │   │       │   ├───insightsScreen
        │   │       │   ├───knowledgeScreen
        │   │       │   ├───searchScreen
        │   │       │   └───userScreen
        │   │       └───sharedComponent
        │   └───mongo-api
        └───documentation
```

# Docker Compose
1. ``` docker compose up --build --force-recreate --remove-orphans ```
   

# MongoDB - via Docker
1. To start only the Mongo DB container ```
2. ```docker compose up -d mongodb ```
3. Open Docker Desktop
4. Open the CLI for the MongoDB container and execute the following commands
5. ```mongosh```  
6. ```use development```
7. ```db.createCollection('mockdata')```
