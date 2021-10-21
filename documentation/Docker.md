# Starting the API Server 

docker-compose up -d --no-deps --build --remove-orphans  mongo-database && docker-compose up --no-deps --build --remove-orphans  express-api 

docker-compose up -d --no-deps --build --remove-orphans  express-api

docker-compose up --no-deps --build -d --remove-orphans  mongo-database

## To build a container without running the container 
docker-compose build --no-cache  express-api