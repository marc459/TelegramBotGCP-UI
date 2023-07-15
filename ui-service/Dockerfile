FROM node:10
RUN apt install -y nginx
WORKDIR /var/www/html
COPY package.json package*.json ./
#RUN npm install --only=production
COPY . .
#CMD [ "npm", "start" ]
CMD service nginx start && bash
