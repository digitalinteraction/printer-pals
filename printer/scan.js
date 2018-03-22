/**
 Read from stdin and print tasks from QR codes
 Date: 19/02/18
 Author: Daniel Welsh
 */
const path = require('path')
require('dotenv').config({
  path: path.join(__dirname, '/../.env')
})
const Raspistill = require('node-raspistill').Raspistill // Take a photo using the camera module
const camera = new Raspistill({
  time: 1, // Set timeout between photos to 1 second
  noFileSave: true, // Pass image directly as a buffer
  contrast: 100
})
const Jimp = require('jimp') // Javascript image processing
const QrCode = require('qrcode-reader') // Read QR codes
const qr = new QrCode() // New instance of a QR code
const mongoose = require('mongoose') // MongoDB adapter
const schemas = require('./../web/schemas') // Schemas for adapter
const printer = require('./print')
let db = {} // Database object adapter connects to
let isPrinting = false // Flag to skip printing if the printer is busy

console.log()

// Connect to mongo
try {
  console.log('Connecting to database')
  mongoose.connect(process.env.MONGO_URI)
} catch (e) {
  console.error(e)
}

/**
 * When a connection to the database is open assign the schemas to db.
 */
mongoose.connection.once('open', () => {
  console.log('Connected to db')
  db = schemas
})

/**
 * Handle an error if one occurs when connecting the database
 * TODO: actually handle this
 */
mongoose.connection.once('error', (error) => {
  console.error(error)
})

/**
 * Decode a QR code
 * - Takes a photo
 * - Parses it to a bitmap using JIMP
 * - Decodes it and querys database for task
 * - Prints the task
 * @returns {Promise<void>}
 *
 * TODO: Check whether this runs without JIMP
 */
async function decodeQR () {
  if (isPrinting) return

  // camera.takePhoto().then((photo) => {
  Jimp.read(path.join(__dirname, './sample-qr.png')).then((image) => {
    image.greyscale()
    image.contrast(0.8)

    console.log('Assinging qr scanner callback')
    qr.callback = async function (err, value) {
      if (err) {
        console.log('Error in scanning QR')
        console.error(err)
        // TODO handle error
      }

      // if (!value) return

      let task
      console.log('Printing result')
      console.log(value.result)

      // Get ID from the QR code should be in the `id:<task_id>` format
      const id = value.result.split(':')[0]

      // Fetch the task
      try {
        task = await db.Task.findOne({_id: id})
      } catch (e) {
        console.error(e)
      }

      // If the task exists, print it.
      // TODO: Print the task.
      if (task) {
        isPrinting = true

        if (/image/.test(task.mimetype)) { // Check if the task is an image
          printer.prepareImage(task).then((path) => {
            console.log('path ', path)
            task.path = path
            printer.printImage(task).then(() => {
              console.log(`Printed task: ${task._id}`)
              isPrinting = false
            }).catch((err) => {
              console.error(err)
            })
          }).catch((err) => {
            console.error(err)
          })
        } else if (/audio/.test(task.mimetype)) { // check if the task is a sound
          // Print the task and play the file
          printer.printSound(task).then(() => {
            console.log('printing sound task')
          }).catch((err) => {
            console.error(err)
          })
        } else {
          console.log('unknown mimetype')
        }
      }
    }
    qr.decode(image.bitmap)
  }).catch((err) => {
    console.error(err)
  })
  // })
}

// Run the QR code decoder once a second
setInterval(decodeQR, 1000)
