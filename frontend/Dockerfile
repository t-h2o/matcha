FROM node:lts-alpine

WORKDIR /app

ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli

EXPOSE 4200

COPY ./AngularApp/package*.json ./

RUN npm install

COPY . .

COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["start.sh"]