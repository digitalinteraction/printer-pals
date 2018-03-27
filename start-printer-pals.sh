#!/bin/bash
mkdir -p ~/printer-pals/uploads
mkdir -p ~/data/db
chmod 775 ~/printer-pals/uploads

mongod --storageEngine=mmapv1 --dbpath=~/data/db &

/etc/init.d/nginx start

nodemon ~/printer-pals/web/app.js &
