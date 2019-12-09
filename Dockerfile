FROM node:latest

COPY ./* /usr/share/TimeIPWebApp/

CMD ["/bin/bash", "-c", "sh node app.js"]

EXPOSE 8090