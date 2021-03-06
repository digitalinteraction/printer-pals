#!/bin/sh

# Install printer pals
#   Download:
#     - mongo
#     - node
#   Install:
#     - amixer
#     - mongo
#     - node
#   Setup:
#     - API
#     - webapp
#   Add:
#     - mongo service
#     - volume service
#     - api service
#
#  WILL RESTART PI

printf "\033[1;31mUpdating and upgrading packages\033[0m\n"
# Check for and install updates
apt-get update -y && apt-get upgrade -y

printf "\033[1;31mSetup USB speaker playback\033[0m\n"
apt-get install -y libasound2-dev mpg321
cp /home/pi/printer-pals/alsa.conf /usr/share/alsa/alsa.conf

########################################################################################################################
### Install Node ###
### https://github.com/nodejs/help/wiki/Installation
########################################################################################################################
printf "\033[1;31mInstalling NodeJS-v8.9.4-arm7vl\033[0m\n"

# Download node 8.9.4
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-armv7l.tar.xz

# Extract and move to /usr/local
tar -xJvf node-v8.9.4-linux-armv7l.tar.xz
cp -R node-v8.9.4-linux-armv7l/* /usr/local
rm -r node-*

# Check versions
npm -v
node -v

########################################################################################################################
### Install mongodb ###
########################################################################################################################
printf "\033[1;31mInstalling Mongo\033[0m\n"

# Install to get 2.4 but let package manager make all the groups
apt-get install mongo -y

# Download 3.2 binaries for ARM7
wget https://github.com/SUMGlobal/rpi-mongodb/raw/master/mongo3-2/mongo
wget https://github.com/SUMGlobal/rpi-mongodb/raw/master/mongo3-2/mongod

# Move into a new folder and make executable
mkdir -p ~/mongo-3.2
mv mongo ~/mongo-3.2/mongo
mv mongod ~/mongo-3.2/mongod
chmod +x -R ~/mongo-3.2/*

# Move to bin
cp -R ~/mongo-3.2/* /usr/bin/
rm -r ~/mongo-3.2

# Create data folder
mkdir -p /home/pi/data/db

# Start mongo
printf "\033[1;31mStarting Mongo\033[0m\n"
mongod --storageEngine=mmapv1 --dbpath ~/data/db &

########################################################################################################################
### Install printer-pals dependencies ###
########################################################################################################################
printf "\033[1;31mInstalling printer-pals dependencies\033[0m\n"

# Create uploads folder
mkdir -p uploads
chmod 775 uploads

# Install web dependencies
npm install --unsafe-perm

npm install -g nodemon

# Install vue dependencies
npm --prefix ./web install --unsafe-perm=true ./web
npm --prefix ./webapp install --unsafe-perm=true ./webapp

# Build vue project
npm --prefix ./webapp run build

# Check versions are correct
printf "\033[1;31mChecking mongo and node versions\033[0m\n"
mongo --version && mongod -v | grep "db version" && node -v && npm -v

# Make services executable
chmod 755 mongod.service
chmod 755 printerpals.service
chmod 755 volume.service

# Add services
cp mongod.service /etc/systemd/system/
cp printerpals.service /etc/systemd/system/
cp volume.service /etc/systemd/system/

# Set services to run at boot
systemctl enable mongod.service
systemctl enable printerpals.service
systemctl enable volume.service

# Add printer to hosts.
echo "127.0.0.1       printer" > /etc/hosts

# Copy environment files
cp ./.env.example ./web/.env

shutdown -r now
