FROM node:21
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ARG VITE_SERVER_URL