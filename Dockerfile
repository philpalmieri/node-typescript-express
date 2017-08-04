FROM node:8.2.1

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]