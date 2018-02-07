/**
 Created:  07/02/18
 Author:   Daniel Welsh
 Description:
    Functions for printing tasks to a thermal printer
 */

const SerialPort = require('serialport')
const Printer = require('thermalprinter')
const jimp = require('jimp')
const path = require('path')

// Set the port and baudrate for the printer - should default to /dev/serial0 and 19200
const loc = '/dev/serial0'
const baudrate = 19200

module.exports = {
  /**
   * Print an image-task on a thermal printer.
   * @param  {Task} task The image task to be printed
   * @return {void}
   */
  printImage: (task) => {
    // Create a serial port with the location and baudrate of the printer
    const port = new SerialPort(loc, {baudRate: baudrate})

    return new Promise((resolve, reject) => {
      // When a connection to the port opens
      port.on('open', () => {
        // Create a new printer
        const printer = new Printer(port)
        // Print a horizontal line
        printer.horizontalLine(32)
          // Typefacing and text options
          .bold(true)
          .inverse(true)
          .printLine(task.title)
          .bold(false)
          .inverse(false)
          .printImage(task.path)
          .horizontalLine(32)
          .printLine(task.description)
          // Actually print
          .print((err) => {
            if (err) reject(err)
            resolve()
          })
      })
    })
  },

  /**
   * Prepare an image for printing
   * must be greyscale and less than 384px in width.
   * @param  {String} path path to image
   * @return {void}
   */
  prepareImage: (filepath) => {
    const rotateAngle = 90
    const maxHeight = 384

    // Get the filename and extension
    const filename = filepath.split('/')[filepath.split('/').length - 1]
    const preparedPath = path.join(__dirname, `/printer-ready/${filename}`)

    // Return a promise of processing the image
    return new Promise((resolve, reject) => {
      // Read in the image
      jimp.read(path.join(__dirname, `/${filepath}`)).then(function (image) {
        // Rotate the image if landscape
        if (image.bitmap.height < image.bitmap.width) {
          image.rotate(rotateAngle)
        }
        image.resize(maxHeight, jimp.AUTO) // resize the image
          .quality(60) // set jpeg quality to 60%
          .greyscale() // greyscale image
          .write(preparedPath) // write new image to file
        resolve(preparedPath) // return the path to prepared image
      }).catch(function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
}
