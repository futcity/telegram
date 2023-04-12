FROM node:18.15-alpine3.16

RUN apk update && \
    apk upgrade && \
    apk add ca-certificates && \
    update-ca-certificates && \
    apk add tzdata && \
    rm -rf /var/cache/apk/*

ENV TZ=Asia/Novosibirsk

WORKDIR /usr/src/app
COPY . .

COPY package*.json ./

RUN npm install

CMD [ "npm", "start" ]