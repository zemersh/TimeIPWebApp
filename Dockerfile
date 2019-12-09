FROM node:latest

COPY ../TimeIPWebApp /usr/share/TimeIPWebApp

CMD ["/bin/bash", "-c", "sh /usr/share/TimeIPWebApp/node app.js"]

EXPOSE 8090