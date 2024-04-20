FROM node:21
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
ARG DATABASE_URL
ARG PORT
ARG JWT_TOKEN