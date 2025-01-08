FROM node


WORKDIR /package_writer

# COPY ../public/ /package_writer/public
# COPY ../src/ /package_writer/src/
# COPY ../package.json /package_writer

COPY . .

RUN ls

RUN npm install


RUN npb build

EXPOSE 8080

CMD ["npm", "run", "host"]
# CMD ["vite", "--host"]