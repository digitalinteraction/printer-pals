# Download Docker image, Node.js running on Alpine
FROM node:slim

RUN apt-get update -y && apt-get upgrade -y

# Install python for serial ports - linux-headers needed for serialport
RUN apt-get install -y \
    python \
    python-dev \
    python-pip \
    build-essential \
    ghc \
    # linux-headers \
    libasound2-dev \
  && pip install virtualenv \
  && apt-get clean

# Make an app directory to hold the server files.
RUN mkdir /app


# Set the working directory to app.
WORKDIR /app


COPY ./package.json /app/package.json


# Install npm packages.
RUN npm install


# Install nodemon
RUN npm install -g nodemon


COPY ./ /app/web
# COPY ./.env /app/.env
# COPY ./app.js /app/app.js
RUN mkdir uploads
RUN mkdir -p printer/qr-codes


# COPY ./webapp /app/webapp
# RUN rm -r /app/webapp/node_modules
# RUN npm --prefix ./webapp install ./webapp
# RUN npm --prefix ./webapp run build


# COPY ./printer /app/printer


# Expose port 80
EXPOSE 80


# Start the server.
CMD nodemon /app/web/app.js
