# NestJS Application with PostgreSQL, Kafka, Redis, Swagger, and Docker

## Descrição

Esta aplicação é construída utilizando o framework **NestJS** e integra várias tecnologias como **PostgreSQL**, **Kafka**, **Redis** e **Swagger** para oferecer uma API funcional e robusta. O objetivo desta aplicação é demonstrar a integração de sistemas de mensagens distribuídas, armazenamento em cache, e a documentação das APIs com Swagger, garantindo um ambiente de desenvolvimento isolado e replicável com Docker.

## Tecnologias Utilizadas

- **NestJS**: Framework principal para construção da aplicação.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.
- **Kafka**: Sistema de mensagens distribuídas usado para processamento em tempo real.
- **Redis**: Utilizado para cache de dados e gerenciamento de sessões.
- **Swagger**: Ferramenta para documentação e teste das APIs.
- **Docker & Docker Compose**: Para configurar o ambiente de desenvolvimento de forma simples e eficiente.

## Funcionalidades

### Módulo de Usuários
- CRUD completo (criação, leitura, atualização e exclusão) para a entidade de usuários.
- Armazenamento dos dados de usuários no banco de dados **PostgreSQL**.
- Uso de **entities** e **DTOs** para a estruturação correta dos dados.

### Integração com Kafka
- **Produtor Kafka** envia eventos quando um usuário é criado ou atualizado.
- **Consumidor Kafka** processa eventos para realizar ações adicionais na aplicação, como logging ou auditoria.

### Documentação com Swagger
- Toda a API está documentada utilizando **Swagger**.
- Rotas podem ser testadas diretamente pela interface do Swagger.

### Cache com Redis
- Implementação de uma estratégia de cache para otimizar o acesso a dados frequentemente requisitados.
- Configuração de cache para consultas específicas utilizando **Redis**.

## Pré-requisitos

- **Docker** e **Docker Compose** instalados.
- **Node.js 20.9** (Utilizar **NVM** para gerenciar a versão do Node).

## Como Iniciar o Projeto

### Passo 1: Clonar o Repositório

Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
## Passo 2: Subir os Serviços com Docker

Utilize o Docker Compose para subir todos os serviços necessários, como PostgreSQL, Redis, Kafka e a própria aplicação:

```bash
docker-compose up --build
```

## Passo 3: Acessar a Aplicação
A aplicação NestJS estará rodando no endereço:

```bash
http://localhost:3000
```

## Passo 4: Acessar o Swagger
Para acessar a documentação interativa da API, utilize o Swagger disponível no seguinte endereço:

```bash
http://localhost:3000/api
```

Nessa interface, você poderá visualizar todas as rotas disponíveis, testar as funcionalidades da API diretamente pela página e verificar os detalhes de cada endpoint.
