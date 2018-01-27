#!/bin/bash
mkdir uploads
chmod 775 uploads

npm install

npm --prefix ./webapp install ./webapp
npm --prefix ./webapp run build

./node_modules/nodemon/bin/nodemon.js app.js
