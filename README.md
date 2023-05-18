# Nexa app 
Backend do desafio NexaBr

## Como utilizar o projeto
```
git clone https://github.com/JhonataAugust0/nexa-app-backend

cd nexa-app-backend-master

npm install

npm start dev
```
### Configurando o banco de dados 
```
docker run --name nexaDb -p 3306:3306 -e MARIADB_ROOT_PASSWORD=password -d mariadb:latest

docker exec -it <containerId> mysql -u root -p <password>

create database nexa;
# Lembre-se de configurar os dados do host corretamente nas variáveis de ambiente
```
