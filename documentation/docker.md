# Starting the API Server 

docker-compose up -d --no-deps --build --remove-orphans  mongo-database && docker-compose up --no-deps --build --remove-orphans  express-api 