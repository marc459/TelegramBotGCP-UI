FROM node:10

RUN apt -y update &&  apt -y upgrade
SHELL ["/bin/bash", "--login", "-c"]
RUN apt install -y nginx curl

WORKDIR /var/www/html
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
#RUN nvm install 18.10 && nvm use 18.10

COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
#CMD [ "npm", "start" ]
CMD nginx -g 'daemon off;' | npm start
