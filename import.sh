#!/bin/sh
# Import printer pals data onto a new device

# Clear existing database
printf "\033[1;31mClearing old databse\033[0m\n"
mongo printerpals --eval "db.dropDatabase()" > /dev/null

# Restore database
printf "\033[1;31mImporting new database\033[0m\n"
mongorestore --db printerpals ~/printer-pals-export/dump/printerpals > /dev/null 2>&1

# Extract uploads and move to uploads folder
printf "\033[1;31mImporting media\033[0m\n"
rm -rf ~/printer-pals/uploads
tar -xzvf ~/printer-pals-export/uploads.tar.gz -C ~/printer-pals/ > /dev/null

printf "\033[1;31mDone\033[0m\n"
