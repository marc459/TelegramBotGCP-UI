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
# COPY test-app /app
# WORKDIR /app/test-app/build
# ENV PATH /app/node_modules/.bin:$PATH
# COPY /react-app/package.json .
# COPY /react-app/package-lock.json .

# # COPY . .
# RUN npm i
# RUN npm install -g serve
# EXPOSE 8080


#RUN npm install react-scripts@3.4.1
#SHELL ["/bin/bash", "--login", "-c"]
#RUN npm run build
#CMD ["serve", "-s", "-l", "8080", "./build"]

FROM nginx:stable-alpine
#COPY --from=build /app/build /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY test-app .
# RUN cd test-app && npm run build && mv build/* /usr/share/nginx/html/
COPY test-app/build/* /usr/share/nginx/html/
#RUN cp -r /app/test-app/build/* /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
