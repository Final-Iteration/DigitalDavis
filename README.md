# UCD Employee Wellness Application 


# Creating a .env file
1. Change the following to include your local ip address 192.168.1.xxx / 10.0.0.xxx

2. ```
    touch .env \
    echo REACT_NATIVE_PACKAGER_HOSTNAME=LOCAL_IPV4_ADDRESS >> .env \
    echo EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 >> .env 
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