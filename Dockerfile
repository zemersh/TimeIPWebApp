FROM node:latest

COPY . /usr/share/TimeIPWebApp/

CMD ["/bin/bash", "-c", "sh /usr/share/TimeIPWebApp/startup.sh"]

EXPOSE 8090