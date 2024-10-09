# Documentação de Deploy para Aplicação CRUD Users

Este documento descreve o processo de deploy da aplicação CRUD Users utilizando GitHub Actions e Docker na VPS.

## 1. Configuração do GitHub Actions

O fluxo de trabalho do GitHub Actions é definido no arquivo `.github/workflows/deployment.yml` e contém as seguintes etapas:

```yaml
name: deployment
on:
  push:
    branches: ['main']
    tags: ['v*.*.*']
  pull_request:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          
      - name: Build and push frontend Docker image
        uses: docker/build-push-action@v5
        with:
          context: '{{defaultContext}}'
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/crud-users:latest, ${{ secrets.DOCKER_USERNAME }}/crud-users:${{ github.run_number }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd api
            docker compose pull
            docker compose down
            docker compose up -d
```
# Documentação de Deploy para Aplicação CRUD Users

Este documento descreve o processo de deploy da aplicação CRUD Users utilizando GitHub Actions e Docker na VPS.

## 1. Configuração do GitHub Actions

O fluxo de trabalho do GitHub Actions é definido no arquivo `.github/workflows/deployment.yml`.

### 1.1. Descrição das etapas

- **Set up Docker Buildx**: Configura o ambiente de build do Docker.
- **Log in to Docker Hub**: Faz login no Docker Hub utilizando as credenciais armazenadas em secrets.
- **Build and push frontend Docker image**: Constrói e faz push da imagem Docker do frontend para o Docker Hub.
- **Deploy to VPS**: Conecta-se à VPS via SSH e executa os comandos Docker para atualizar a aplicação.

## 2. Configuração da VPS

### 2.1. Criar a pasta `api`

No seu servidor VPS, crie uma pasta chamada `api` onde a aplicação será hospedada. Você pode fazer isso com o seguinte comando:

```bash
mkdir ~/api
```

## 2.2. Criar o arquivo `docker-compose.yml`

Dentro da pasta `api`, crie um arquivo chamado `docker-compose.yml` com o seguinte conteúdo:

```yaml
services:
  db:
    image: postgres:15
    container_name: postgres_db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - mynetwork
    restart: always
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    networks:
      - mynetwork
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
  kafka:
    image: confluentinc/cp-kafka:latest
    networks:
      - mynetwork
    depends_on:
      - zookeeper
    ports:
      - '9092:9092'
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://kafka:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  kafdrop:
    image: obsidiandynamics/kafdrop:latest
    networks:
      - mynetwork
    depends_on:
      - kafka
    ports:
      - '19000:9000'
    environment:
      KAFKA_BROKERCONNECT: kafka:29092

  redis:
    container_name: redis-app
    image: redis:latest
    networks:
      - mynetwork
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    restart: always
  app:
    image: erikmartins47/crud-users
    ports:
      - '3000:3000'
    depends_on:
      - redis
      - db
      - kafka
    env_file:
      - .env
    networks:
      - mynetwork
volumes:
  postgres_data:
  redis_data:

networks:
  mynetwork:
    driver: bridge

```


## 2.3. Criar o arquivo .env
Ainda dentro da pasta api, crie um arquivo chamado .env para armazenar variáveis de ambiente necessárias. O conteúdo pode ser semelhante ao seguinte:

```env
DB_HOST = example
DB_USER = example
DB_PASS = example
DB_NAME = example
DB_PORT = 5432
```

# 3 Executar o Deploy

Após a configuração, o deploy será automaticamente acionado sempre que houver um push na branch `main` ou um pull request para a mesma. O GitHub Actions construirá a imagem e fará o deploy na VPS.

## 3.1. Comandos para gerenciar a aplicação

Após o deploy, você pode gerenciar a aplicação usando os seguintes comandos dentro da pasta `api` na VPS:

### Para parar a aplicação:

```bash
docker compose down
docker compose up -d
docker compose pull
```
# 4. Conclusão
Agora, CRUD Users está configurada para ser implantada automaticamente sempre que você fizer alterações na branch main. 