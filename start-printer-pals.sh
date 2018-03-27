#!/bin/bash
mkdir -p /home/pi/printer-pals/uploads
mkdir -p /home/pi/data/db
chmod 775 /home/pi/printer-pals/uploads

mongod --storageEngine=mmapv1 --dbpath=/home/pi/data/db &

/etc/init.d/nginx start

nodemon /home/pi/printer-pals/web/app.js &
