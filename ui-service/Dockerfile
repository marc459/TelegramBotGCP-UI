FROM debian:buster

RUN apt update
RUN apt install -y nginx
WORKDIR /var/www/html
COPY package.json package*.json ./
#RUN npm install --only=production
COPY . .
#CMD [ "npm", "start" ]
CMD nginx -g 'daemon off;'
