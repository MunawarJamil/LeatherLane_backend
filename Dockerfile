
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install  
# RUN npm install --production
#  later will add for production image
COPY . .

EXPOSE 9000

ENV NODE_ENV=production

# CMD [ "npm" , "run" , "docker-dev" ]
CMD [ "node", "src/server.js" ]
