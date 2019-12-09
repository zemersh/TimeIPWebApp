FROM node:latest

COPY ./geoserver-2.15.1 /usr/share/TimeIPWebApp

CMD ["/bin/bash", "-c", "sh node app.js"]

EXPOSE 8090