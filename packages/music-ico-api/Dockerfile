FROM node:9
MAINTAINER Alexey Elizarov

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app

EXPOSE 5500

CMD if [ "${NODE_ENV}" = "development" ]; then \
  yarn --cwd packages/music-ico-api dev; \
else \
  yarn --cwd packages/music-ico-api start; \
fi