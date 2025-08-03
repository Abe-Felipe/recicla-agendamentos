FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . .

EXPOSE 80