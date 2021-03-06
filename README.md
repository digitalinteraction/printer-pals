# Printer Pals 🖨
### A Printer Based Game to Support Interactions in Care Homes

## Description
Upload images and songs to a raspberry pi, giving them a title, a short
description and a task. A receipt of the content will be printed out,
identified by a QR code.

The QR can then be scanned, which will print out the content, along with
the task, which you can complete with a friend in a care home.

## Hardware
- Raspberry Pi 3
- Thermal printer
- 8mp Pi camera
- USB speakers

## Software
- Vue application, served by the Pi:
 - Volunteers can upload media they have saved on their phone.
 - Volunteers can media they have uploaded.
- API which prints a QR code when new content is uploaded.
- Client to print content when scanned, using a camera and QR codes.

## Installation
### 1. Turning on the Pi and Opening the Terminal
To use the Raspberry Pi so we can install and run printer-pals we need
to power it and connect it to a mouse, monitor, and keyboard. Connect the
mouse and keyboard over USB, and then connect to a monitor via the HDMI
port. The last thing to do is connect it to power by plugging a 5v power
supply into the micro USB port. The Pi should begin booting, opening up
to desktop display.

Once the Pi has booted up we need to then open up a terminal window so we
can start entering commands into the command line. To do this click on the
4th icon from the top left of the desktop display. This should open a
a black window where you will see something like:
```bash
pi@raspberrypi: ~ $
```
You can start typing in your commands here.

### 2. Enabling Camera and Serial Modules
We need to ensure printer-pals can access the camera and the printer over
a serial connection. To do this we need to edit the Raspberry Pi's
settings to enable the modules. Type the command below to bring up the
settings menu:
```bash
sudo raspi-config
```
From the menu select option `5. Interfacing Options`, then select `P1
Camera`, then `Yes`, then `Ok`. The camera is now enabled. To enable
serial connections select `5. Interfacing Options`, then `P6 Serial`,
then `No`, then `Yes`, then `Ok`. The Pi should now be able to
interface with the printer.

After this select finish, you should be prompted to reboot the Pi, but
if this dialog box does not appear enter the command below to restart
the Pi.
```bash
sudo shutdown -r now
```

### 3. Setting up the WiFi
To connect to the router we need to edit the file the Raspberry uses to
store it's WiFi connections. To do this run the command
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```
The file will have some text in it, you need to modify it to have the
code below, replacing the `SSID` and `Password` placeholders with
the credentials for the router you want to connect to. You can create a
new network block for each individual network you wish to connect to.
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  ssid="WIFI_NAME"
  psk="WIFI_PASSWORD"
  proto=RSN
  key_mgmt=WPA-PSK
  pairwise=CCMP
  auth_alg=OPEN
}
```

Save the file by pressing `CTRL+X` to exit, and then `Y` to save the
file when prompted.

This won't take effect until the Pi is restarted. You can restart the Pi
with the command:
```bash
sudo shutdown -r now
```
The Pi should restart and automatically connect to the router.

### 4. Downloading Printer-Pals
After connecting the Pi to WiFi, we can download printer-pals to the Pi
so that we can begin installing the dependencies needed for it run
properly. To download the project run the command:
```shell
git clone https://github.com/digitalinteraction/printer-pals.git
cd printer-pals
```
The first command will download the latest version of the project from
Open Lab's Github account, and create a new folder called `printer-pals`
with the project inside. The second command will then change our working
directory to the project we just downloaded so we can continue setting
up the project.

### 5. Installing Dependencies
Now the Pi is connected to the internet we can install all of the
dependencies and libraries printer-pals needs to run. This can be done
with the command:
```bash
sudo ./install.sh
```

This will run a series of commands contained in the `install.sh` file,
installing the NodeJS to execute the code, Mongo to store the data,
and builds printer-pals so it is ready to run.

Check this has finished correctly. Once the script has finished you should
see the following:
```bash
Checking mongo and versions
MongoDB shell version: 3.2.15

```

### 6. Setting Printer-Pals to Start Automatically
To set the Pi to run printer-pals at boot we need to tell it to run a
script every time it turns on. Enter the command:
```bash
sudo cat run.sh > /etc/rc.local
```
This will override the usual scripts the Raspberry Pi runs at boot with
a script we can use to manually start printer-pals.

### 7. Setting Printer-Pals Environment Variables
We need to tell printer-pals what credentials and passwords it needs to
connect to the database, and what it can use to seed session tokens when
people log into the webapp. To do this enter:
```bash
nano .env
```
And add the following text, changing `random_secret_string` to some
random text.
```env
DEBUG=false
DB_USER=user
DB_PASS=password
DB_HOST=mongo
DB_NAME=database_name
PORT=27017
SALT_ROUNDS=10
APP_SECRET=random_secret_string
```

### 8. Running Printer Pals
Now that everything is installed we can run printer pals using the
command:
```bash
sudo ./run.sh
```
This will start the database, server, and the QR Code scanner.

**Congration, you done it 🏆🎉**

## Updating Printer-Pals
To update printer pals you need to run the command:
```bash
cd ~/printer-pals && git pull
```
This will fetch the latest version of the code from the server. You then
need to restart the Pi, forcing it to run the latest version when it boots
up. Do this by entering:
```bash
sudo shutdown -r now
```

## Using Printer Pals
### 1. Setting up A Router
Firstly, you need to setup a router, with the ssid `printer-pals`, and the password as `print`. Once this is setup plug in printer-pals and it should connect automatically.

### 2. Find the Website
Once connected to power printer-pals will begin serving a webpage which you can use to start uploading and printing media. Open a browser and navigate to:
```bash
http://printer
```
This will connect to the printer over the local network you just set up.

### 3. Start Printing
Create an account and start printing some fun tasks! 🖨
