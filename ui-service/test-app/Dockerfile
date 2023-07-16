#build stage for a Node.js application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nx
COPY . .
RUN nx build app-name --prod

#production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/apps/app-name /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]