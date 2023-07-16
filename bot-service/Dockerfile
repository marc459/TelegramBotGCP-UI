FROM node:10
WORKDIR /usr/src/app
COPY package.json package*.json ./
RUN npm install --only=production
COPY . .
ENV PORT 3000
ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "npm", "start" ]
