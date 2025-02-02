FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build
# RUN npm i -g serve



# EXPOSE 3000

# CMD [ "serve", "-s", "dist" ]
CMD [ "yarn", "run", "preview"]