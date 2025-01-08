FROM node

WORKDIR /package_writer

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "host"]
# CMD ["vite", "--host"]