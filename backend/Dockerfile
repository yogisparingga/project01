FROM node:18-alpine

RUN apk add --no-cache ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

EXPOSE 3000 1935 8000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
