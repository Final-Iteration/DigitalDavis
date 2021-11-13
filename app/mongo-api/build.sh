#!/bin/bash

VAR1="docker"
VAR2="database"

if [[ "${NODE_ENV}" == "docker" ]]; then
    echo "Starting Docker Services mongo-database & express-api"
    cd ..
    docker network create --subnet 172.23.0.0/16 dev_network
    docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build -d --remove-orphans mongo-database
    docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api
fi
if [[ "${NODE_ENV}" == "database" ]]; then
    echo "Starting Docker Services mongo-database"
    cd ..
    docker network create --subnet 172.23.0.0/16 dev_network
    docker-compose -f docker-compose.dev.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build -d --remove-orphans mongo-database
fi

docker-compose -f docker-compose.prod.yml --project-name final_iteration --env-file ./mongo-api/.env up --no-deps --build --remove-orphans express-api
fi