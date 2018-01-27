#!/bin/bash
npm install

npm --prefix ./webapp install ./webapp
npm --prefix ./webapp run build

./node_modules/nodemon/bin/nodemon.js app.js
