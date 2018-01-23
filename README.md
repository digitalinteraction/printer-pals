# Printer Pals 🖨
### A Printer Based Game to Support Interactions in Care Homes

## Description
Upload images and songs to a raspberry pi, giving them a title, a short description and a task.
A receipt of the content will be printed out, identified by a QR code.

The QR can then be scanned, which will print out the content, along with the task, which you
can complete with a friend in a care home.

## Hardware
- Raspberry Pi 3
- Thermal printer
- 8mp Pi camera
- USB speakers

## Software
- Server to upload content
- Client to print content when uploaded, listening on web sockets
- Client to print content when scanned, listening on web sockets

## Starting the server
Create a `.env` file with the following contents:
```
DEBUG=false
DB_USER=user
DB_PASS=password
DB_HOST=mongo
DB_NAME=database_name
PORT=27017
SALT_ROUNDS=10
APP_SECRET=random_secret_string
```
