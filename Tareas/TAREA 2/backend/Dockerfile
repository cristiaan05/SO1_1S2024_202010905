FROM node:20.11.0-alpine

WORKDIR /Backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run","dev" ]
