FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

EXPOSE 5000
CMD npx serve -s public
