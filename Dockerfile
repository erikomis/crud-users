FROM node:20.8 AS builder


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install

COPY . .

# Compila o projeto
RUN npm run build

FROM node:18 AS production

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./


RUN npm install --only=production


COPY --from=builder /usr/src/app/migrations ./migrations

RUN npm run typeorm migration:run


ENV PORT=3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]