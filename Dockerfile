FROM node:18

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

COPY . .

WORKDIR /app/server

EXPOSE 8080

CMD ["node", "index.js"]