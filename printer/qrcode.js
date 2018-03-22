/**
 * QR Code Util
 * Author: Daniel Welsh
 * Date: 21/03/2018
 * Description:
 *  Tools for qr codes.
 * @type {[type]}
 */

const fs = require('fs')
const jimp = require('jimp') // image editing
// const QrCode = require('qrcode-reader') // Read QR codes
const qrImage = require('qr-image')
// const qr = new QrCode() // New instance of a QR code

const MAX_HEIGHT = 384

module.exports = {
  /**
   * Encode data as a QR Code and save to file
   * @param  {Object}  data Task to encode as QR
   * @return {Promise}      Returns a path to the QR code.
   */
  saveTaskQRToFile: (task) => {
    return new Promise((resolve, reject) => {
      // set file type
      const fileType = 'png'
      const qrName = `qr-${task._id}`

      try {
        // generate qr code as svg
        const qrSVG = qrImage.image(task._id, { type: fileType })
        // const qrSVG = qr.image(data, { type: fileType })
        qrSVG.pipe(fs.createWriteStream(qrName))
      } catch (e) {
        reject(e)
      }

      // Read in the image
      jimp.read(qrName).then((image) => {
        image.resize(MAX_HEIGHT, jimp.AUTO) // resize the image
          .quality(100) // set jpeg quality to 80%
          // .greyscale() // greyscale image
          .write(qrName) // write new image to file

        resolve(qrName)
      })
    })
  }
}
