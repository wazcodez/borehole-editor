FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

ENV NEXTAUTH_URL https://jammtek.com/api/auth

# Running the app
CMD "npm" "run" "start"