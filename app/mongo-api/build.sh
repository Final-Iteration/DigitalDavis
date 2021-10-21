# bin/bash!
export NODE_ENV=development
cd .. \
&& docker-compose -f docker-compose.development.yml --project-name final_iteration --env-file ./mongo-api/.env.dev up --no-deps --build -d --remove-orphans  mongo-database \
&& docker-compose -f docker-compose.development.yml --project-name final_iteration --env-file ./mongo-api/.env.dev up --no-deps --build --remove-orphans express-api
