FROM node:9
MAINTAINER Alexey Elizarov

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add lerna

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app
RUN lerna bootstrap

CMD ["yarn", "--cwd", "packages/music-ico-watcher", "start"]