/*
 Read from stdin and print tasks from QR codes
 Date: 19/02/18
 Author: Daniel Welsh
 */
const Raspistill = require('node-raspistill').Raspistill
const camera = new Raspistill()
const Jimp = require('jimp')
const QrCode = require('qrcode-reader')
const qr = new QrCode()
const mongoose = require('mongoose')
const schemas = require('./../web/schemas')
let db = {}

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  db = schemas
})
mongoose.connection.once('error', (error) => {
  console.error(error)
})

qr.callback = async function (err, value) {
  if (err) {
    console.error(err)
    // TODO handle error
  }
  console.log(value.result)
  const id = value.result.split(':')[0]
  try {
    const task = await db.schemas.Task.findOne({_id: id})
    console.log(task)
  } catch (e) {
    console.error(e)
  }
}

async function parse () {
  camera.takePhoto().then((photo) => {
    Jimp.read(photo).then((image) => {
      qr.decode(image.bitmap)
    }).catch((err) => {
      console.error(err)
    })
  })
}

setInterval(parse, 1000)
