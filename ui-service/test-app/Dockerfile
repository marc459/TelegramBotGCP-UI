# #build stage for a Node.js application
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY . .
# COPY package*.json ./
# RUN npm install
# #RUN npm install -g nx

# #RUN nx build app-name --prod
# RUN npm run build

# #production stage
# FROM nginx:stable-alpine as production-stage
# #COPY nginx.conf /etc/nginx/conf.d/configfile.template
# RUN rm -rf /usr/share/nginx/html/*
# # RUN echo "hola" >> /usr/share/nginx/html/index.html
# RUN rm -rf /var/www/html/*
# #COPY --from=build-stage /app/dist/apps/app-name /usr/share/nginx/html
# #COPY --from=build-stage /app/build/* /usr/share/nginx/html/
# COPY /build/* /usr/share/nginx/html/
# ENV PORT 80
# ENV HOST 0.0.0.0
# EXPOSE 80
# # CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
# CMD ["nginx", "-g", "daemon off;"]



# # build environment
# FROM node:8-alpine as react-build
# WORKDIR /app
# COPY . ./
# RUN npm install
# RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 80
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]