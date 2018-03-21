/**
 Created:  07/02/18
 Author:   Daniel Welsh
 Description:
    Functions for printing tasks to a thermal printer
    TODO: Fix QR Code
 */

const SerialPort = require('serialport') // connecting to a serial port
const Printer = require('thermalprinter') // controlling the thermal printer
const jimp = require('jimp') // image editing
const path = require('path')
const fs = require('fs')
const qrUtils = require('./qrcode')

// Set the port and baudrate for the printer - should default to /dev/serial0 and 19200
const loc = '/dev/serial0'
const baudrate = 19200

module.exports = {
  /**
   * Print an image-task on a thermal printer.
   * @param  {Object} task The image task to be printed
   * @return {Promise} promise to print task
   */
  printImage: (task) => {
    return new Promise(async (resolve, reject) => {
      const qrPath = await qrUtils.generateQR(`task:${task._id}`)
      // Create a serial port with the location and baudrate of the printer
      const port = new SerialPort(loc, {
        baudRate: baudrate,
        autoOpen: false
      })

      // When a connection to the port opens
      port.on('open', () => {
        const options = {
          maxPrintingDots: 10
        }
        // Create a new printer
        const printer = new Printer(port, options)
        // Print a horizontal line
        printer.horizontalLine(32)
          // Typefacing and text options
          .printImage(task.path)
          .horizontalLine(32)
          .bold(true)
          .inverse(true)
          .printLine(task.title)
          .bold(false)
          .inverse(false)
          .printLine(task.description)
          .horizontalLine(32)
          .printImage(path.join(__dirname, `/${qrPath}`))
          .printLine('\n\n\n')

          // Actually print
          .print((err) => {
            if (err) reject(err)
            resolve()
          })
      })

      port.open()
    })
  },

  /**
   * Print a sound task
   * @param  {Object} task task to be printed
   * @return {Promise} promise to print task
   */
  printSound: async (task) => {
    // Create a serial port with the location and baudrate of the printer
    const port = new SerialPort(loc, {baudRate: baudrate})
    const qrPath = await qrUtils.generateQR(`task:${task._id}`)

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
          .printLine(task.description)
          .horizontalLine(32)
          .printImage(path.join(__dirname, `/${qrPath}`))
          .printLine('\n\n\n')

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
   * @param  {Object} task The task that needs preparing
   * @return {Promise}     A promise to prepare the image
   */
  prepareImage: (task) => {
    return new Promise((resolve, reject) => {
      const rotateAngle = 90
      const maxHeight = 384

      // Get the filename and extension
      const filename = task.path.split('/')[task.path.split('/').length - 1]
      const preparedPath = path.join(__dirname, `/printer-ready/${filename}`)

      // Return a promise of processing the image
      // return new Promise((resolve, reject) => {
      // Check to see if the prepared image already exists
      fs.stat(preparedPath, (err, stat) => {
        if (err === null) {
          // File exists - return path to file
          resolve(preparedPath)
        } else if (err.code === 'ENOENT') {
          // file does not exist - generate prepared image
          // Read in the image
          jimp.read(task.path).then((image) => {
            // Rotate the image if landscape
            if (image.bitmap.height < image.bitmap.width) {
              image.rotate(rotateAngle)
            }
            image.resize(maxHeight, jimp.AUTO) // resize the image
              .quality(80) // set jpeg quality to 80%
              .greyscale() // greyscale image
              .write(preparedPath) // write new image to file

            resolve(preparedPath)
          })
        } else {
          reject(err)
        }
      })
    })
  }
}
