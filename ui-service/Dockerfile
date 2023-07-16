# FROM node:10

# #RUN apt -y update &&  apt -y upgrade
# #SHELL ["/bin/bash", "--login", "-c"]
# #RUN apt install -y nginx curl


# COPY react-app /usr/src/app
# WORKDIR /usr/src/app/reac-app
# RUN npm install --production
# #WORKDIR /usr/src/app

# #RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# #RUN nvm install 18.10 && nvm use 18.10

# COPY package.json package*.json ./
# #COPY index.js pubsubmanage.js index.html ./
# #CMD bash -c "npm start & nginx -g 'daemon off;'"
# #CMD nginx -g 'daemon off;'
# CMD [ "npm", "start" ]
# #CMD nginx -g 'daemon off;'


# FROM node:10
# # COPY test-app /app
# # WORKDIR /app/test-app/build
# WORKDIR /build
# ENV PATH /app/node_modules/.bin:$PATH
# # COPY /test-app/package.json .
# # COPY /test-app/package-lock.json .
# COPY /build /build

# # COPY . .
# #RUN npm i
# RUN npm install -g serve
# EXPOSE 8080



# CMD ["serve", "-s", "-l", "8080", "./build"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html/

#COPY --from=build /app/build /usr/share/nginx/html

#COPY test-app .
# RUN cd test-app && npm run build && mv build/* /usr/share/nginx/html/
COPY /test-app/build .
#RUN cp -r /app/test-app/build/* /var/www/html
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
