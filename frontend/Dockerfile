FROM node:lts-alpine

WORKDIR /app

ENV NG_CLI_ANALYTICS=false

RUN npm install -g @angular/cli

EXPOSE 4200

COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]