FROM node:14 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm install -g rimraf 

RUN npm run build


FROM node:15.8.0-alpine3.10

ARG API_BASE_URL
ARG API_USERNAME
ARG API_PASSWORD
ARG API_PORT
ARG API_GLOBAL_BASE_URL

ENV API_BASE_URL=$API_BASE_URL
ENV API_USERNAME=$API_USERNAME
ENV API_PASSWORD=$API_PASSWORD
ENV API_PORT=$API_PORT
ENV API_GLOBAL_BASE_URL=$API_GLOBAL_BASE_URL

WORKDIR /app

COPY --from=builder /app ./

RUN npm install pm2 -g

CMD ["pm2-runtime","dist/main.js"]
