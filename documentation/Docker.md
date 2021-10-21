# Starting the API Server 

docker-compose up -d --no-deps --build --remove-orphans  mongo-database && docker-compose up --no-deps --build --remove-orphans  express-api 

docker-compose up -d --no-deps --build --remove-orphans -p final_iteration express-api

docker-compose up --no-deps --build -d --remove-orphans  mongo-database


## To build a container without running the container 
docker-compose build --no-cache  express-api

# Starting the API and the DB locally
docker-compose -f docker-compose.development.yml up -d --remove-orphans --force-recreate --build