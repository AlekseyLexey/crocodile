FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV production
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["node", "src/server.js"]