FROM node:10
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
ENV HOST 0.0.0.0
EXPOSE 8080
CMD [ "npm", "start" ]
