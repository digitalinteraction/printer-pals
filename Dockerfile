# Download Docker image, Node.js running on Alpine
FROM node:alpine


# Install python for serial ports - linux-headers needed for serialport
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    ghc \
    linux-headers \
    libasound2-dev \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

# Make an app directory to hold the server files.
RUN mkdir /app


# Set the working directory to app.
WORKDIR /app


COPY ./package.json /app/package.json


# Install npm packages.
RUN npm install


# Install nodemon
RUN npm install -g nodemon


COPY ./web /app/web
COPY ./.env /app/.env
COPY ./app.js /app/app.js
RUN mkdir uploads
RUN mkdir -p printer/qr-codes


COPY ./webapp /app/webapp
RUN rm -r /app/webapp/node_modules
RUN npm --prefix ./webapp install ./webapp
RUN npm --prefix ./webapp run build


COPY ./printer /app/printer


# Expose port 8888
EXPOSE 8888


# Start the server.
CMD nodemon /app/app.js
