FROM node:17-alpine

WORKDIR /app

# Installing system dependencies
RUN apk add --no-cache --update python3 make gcc g++ libc-dev

# Installing npm dependencies separately to take advantage of layers caching
COPY package*.json ./
RUN npm install -g node-gyp && npm install

# Copying rest of the files
COPY . ./

# Adding to PATH
RUN echo "export PATH=$PATH:/app/node_modules/.bin/" > /etc/environment
