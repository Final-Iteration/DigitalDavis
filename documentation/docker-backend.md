# HOW TO BUILD THE APPLICATION BACKEND
###### UPDATED 10/23/21

## PREREQUISITES 
1. Docker must be started 
2. You need to have updated node modules in the /app/mongo-api/


### Create the Docker Network
###### (only needs to be done once)
```bash
docker network create --subnet 172.23.0.0/16 dev_network
```

### Build and Start the Database
###### (Must be built before the API)
```bash
 docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build -d --remove-orphans mongo-database
```
### Build and Start the API
###### (Can be rebuilt without )
```bash
    docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api
```
