FROM node:18-alpine
WORKDIR /package_writer
COPY ../public/ /package_writer/public
COPY ../src/ /package_writer/src/
COPY ../package.json /package_writer

RUN npm install

CMD ["npm", "start"]