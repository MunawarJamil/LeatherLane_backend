# 1️⃣ Use a lightweight Node.js image
FROM node:22-alpine

# 2️⃣ Set working directory inside the container
WORKDIR /usr/src/app

# 3️⃣ Copy only package files first (for caching layers)
COPY package*.json ./

# 4️⃣ Install only production dependencies
RUN npm install --production

# 5️⃣ Copy the rest of your app source code
COPY . .

# 6️⃣ Expose your backend port
EXPOSE 5000

# 7️⃣ Set environment to production
ENV NODE_ENV=production

# 8️⃣ Start the server
CMD ["node", "src/server.js"]
