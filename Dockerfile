 
FROM node:22-alpine
 
WORKDIR /usr/src/app
 
COPY package*.json ./
 
RUN npm install --production
 
COPY . .
 
EXPOSE 7000
 
ENV NODE_ENV=production
 
CMD ["node", "src/server.js"]
