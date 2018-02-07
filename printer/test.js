// Test that the printer properly processes and prints images
const printer = require('./print.js')

const main = async () => {
  let path = ''
  try {
    path = await printer.prepareImage('sample-full.jpg')
    await printer.prepareImage('sample-landscape.jpg')
  } catch (e) {
    console.error(e)
  }

  try {
    await printer.printImage({
      title: 'Pug',
      description: 'Is this a good puggo?',
      path: path
    })
  } catch (e) {
    console.error(e)
  }
}

main()
