FROM node:8.2.1

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm install --global nodemon

CMD [ "npm", "start" ]
#MD ["nodemon", "-L", "/usr/src/app/dist/app.js"]