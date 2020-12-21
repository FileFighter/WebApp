FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy static files
COPY . .

EXPOSE 8080
CMD npx http-server public
