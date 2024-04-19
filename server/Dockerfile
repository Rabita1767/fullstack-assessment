FROM node:21
WORKDIR /server
COPY package*.json ./
RUN npm install
# ENV DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5431/teebay?schema=public"
# ENV PORT=8000
# ENV JWT_TOKEN=123456789
COPY . .
# EXPOSE 8000
RUN npx prisma generate
# RUN npx prisma migrate dev
# RUN npx prisma db seed
RUN npm run build
ARG DATABASE_URL
ARG PORT
ARG JWT_TOKEN
# RUN node ./dist/src/app.js
# CMD [ "npm", "run", "start" ]