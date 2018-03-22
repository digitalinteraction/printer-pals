/**
 * QR Code Util
 * Author: Daniel Welsh
 * Date: 21/03/2018
 * Description:
 *  Tools for qr codes.
 * @type {[type]}
 */

const path = require('path')
const fs = require('fs')
const jimp = require('jimp') // image editing
const qrImage = require('qr-image')

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
      const qrName = `qr-codes/qr-${task._id}.${fileType}`

      try {
        // generate qr code as svg
        const qrSVG = qrImage.image(`task:${task._id}`, {
          type: fileType,
          ec_level: 'H'
        })
        // const qrSVG = qr.image(data, { type: fileType })
        let p = qrSVG.pipe(fs.createWriteStream(path.join(__dirname, `./${qrName}`)))

        p.on('finish', () => {
          // Read in the image
          console.log('Pipe finished')
          jimp.read(path.join(__dirname, `./${qrName}`)).then((image) => {
            image.resize(MAX_HEIGHT, jimp.AUTO) // resize the image
              .quality(100) // set jpeg quality to 80%
              .greyscale() // greyscale image
              .write(qrName, () => {
                resolve(qrName)
              }) // write new image to file
          })
        })

        p.on('error', (e) => {
          console.error(e)
          reject(e)
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
