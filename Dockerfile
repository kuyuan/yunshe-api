FROM node:10.15.1

LABEL maintainer="bran@corran.cn"

WORKDIR /app

# Only copy package.json and yarn.lock instead of all files
COPY package.json ./
COPY yarn.lock ./

# Do not install devDependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the app
RUN yarn build

EXPOSE 3000

# Start the server
CMD [ "yarn", "start" ]
