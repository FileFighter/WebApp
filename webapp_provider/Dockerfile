# dockerfile
FROM nginx
RUN apt update && apt upgrade -y
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY public /var/www/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
