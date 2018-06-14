#!/bin/sh

# Export printer-pals data to use on a new device
printf "\033[1;31mClearing previous export\033[0m\n"
rm -rf ~/printer-pals-export
mkdir ~/printer-pals-export

# Export database
printf "\033[1;31mExporting database\033[0m\n"
mongodump --db printerpals > /dev/null
mv ./dump/ ~/printer-pals-export/

# Archive and compress uploads
printf "\033[1;31mExporting media\033[0m\n"
tar -czvf uploads.tar.gz ./uploads/ > /dev/null
mv ./uploads.tar.gz ~/printer-pals-export/uploads.tar.gz

printf "\033[1;31mExported to ~/printer-pals-export\033[0m\n"
