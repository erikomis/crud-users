FROM node:20.8 AS builder


WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

# Compila o projeto
RUN npm run build

FROM node:20.8 AS production

WORKDIR /app


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./


RUN npm install --only=production


ENV PORT=3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]