const util = require('util')
const exec = util.promisify(require('child_process').exec)
const LogScale = require('log-scale')

/**
 * Set the system volume
 * @param  {int}  increment amount to increment by
 * @return {Promise}
 */
const setSystemVolume = async (increment) => {
  let volume = await getSystemVolume()
  let scale = new LogScale(-20, 100)
  let tVolume = scale.logarithmicToLinear((volume + increment))

  // use amixer to set master volume
  const command = `amixer -c 1 sset PCM ${tVolume * 100}%`

  try {
    if (tVolume) {
      await exec(command)
      return true
    }
  } catch (e) {
    console.error(e)
    return false
  }
}

/**
 * Get the system volume
 * @return {float} System volume
 */
const getSystemVolume = () => {
  return new Promise((resolve, reject) => {
    // use amixer to get volume
    const command = 'amixer -c 1 get PCM'
    exec(command, (err, stdout, stderr) => {
      if (err) reject(err)
      // get value from stdout
      const lines = stdout.split('\n')
      const mono = lines[4]
      const monoLines = mono.split(' ')
      const volume = parseInt(monoLines[5].replace(/[^A-Za-z0-9_]/g, ''))

      // Value is a linear representation of a linear scale, convert back to logarithmic
      let scale = new LogScale(-20, 100)
      resolve(scale.linearToLogarithmic(volume / 100))
    })
  })
}

module.exports = {
  setSystemVolume
}
