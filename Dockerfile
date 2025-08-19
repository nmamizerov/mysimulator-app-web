#Stage 1
# FROM node:18-alpine as builder
# WORKDIR /app
# COPY package*.json .
# COPY package-*.lock .
# RUN npm install
# COPY . .
# RUN npm run build

#Stage 2
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
RUN rm /etc/nginx/conf.d/default.conf
COPY dist .
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]


# yarn build:simulator && docker buildx build --platform linux/amd64,linux/arm64 --push -t nmamizerov/mysimulator_web_simulator .
# yarn build:course && docker buildx build --platform linux/amd64,linux/arm64 --push -t nmamizerov/mysimulator_web_course .
