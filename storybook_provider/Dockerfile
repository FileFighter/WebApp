FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade

# Copy static files
COPY . .

EXPOSE 8080
CMD npx http-server public
