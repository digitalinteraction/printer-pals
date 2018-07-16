/**
 * Audio utilities, play music tasks
 * Author: Daniel Welsh
 * Date: 22/03/2018
 * Desc:
 *  Create an audio player and play uploaded sounds through the device.
 */

const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = {
  playSoundTask: (task) => {
    const ext = task.path.split('.')[task.path.split('.').length - 1]
    switch (ext) {
      case 'mp3':
        exec(`mpg321 ${task.path}`)
        break
      default:
        exec(`aplay ${task.path}`)
    }
  }
}
