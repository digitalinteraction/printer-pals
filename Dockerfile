# Download Docker image, Node.js running on Alpine
FROM node:alpine


# Make an app directory to hold the server files.
RUN mkdir /app


# Set the working directory to app.
WORKDIR /app


COPY ./package.json /app/package.json


# Install npm packages.
RUN npm install


# Install nodemon
RUN npm install -g nodemon


COPY ./ /app


# Persist data to the data volume
VOLUME /data


# Expose port 80
EXPOSE 8888


# Start the server.
CMD nodemon app.js