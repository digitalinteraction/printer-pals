/**
 * Audio utilities, play music tasks
 * Author: Daniel Welsh
 * Date: 22/03/2018
 * Desc:
 *  Create an audio player and play uploaded sounds through the device.
 */

const Player = require('player')

module.exports = {
  playSoundTask: (task) => {
    return new Promise((resolve, reject) => {
      // create player instance
      console.log('Setting up player for: ', task.path)
      const player = new Player(task.path)

      // play now and callback when playend
      player.play((err, player) => {
        if (err) reject(err)
        console.log('playend!')
        resolve()
      })

      player.on('error', (e) => {
        console.error(e)
      })
    })
  }
}
