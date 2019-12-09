FROM node:latest

COPY . /usr/share/TimeIPWebApp/

WORKDIR /usr/share/TimeIPWebApp/

EXPOSE 8090

CMD [ "node", "app.js"]

