FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

ARG VITE_VERSION
ARG VITE_API
ARG VITE_PING_DELAY
ARG VITE_AI_URL
ARG VITE_MODE

RUN yarn run build

EXPOSE 8086

CMD [ "yarn", "run", "preview"]