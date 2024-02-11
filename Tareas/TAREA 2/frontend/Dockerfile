FROM node:20.11.0-alpine

WORKDIR /Frontend

COPY package.json /Frontend

#copy yarn.lock
COPY package-lock.json /Frontend

# run yarn 
RUN npm install

COPY . ./

EXPOSE 5173

CMD ["npm","run" ,"dev"]
