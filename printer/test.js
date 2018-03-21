// Test that the printer properly processes and prints images
const printer = require('./print.js')

const main = async () => {
  let path = ''
  let testTask = {
    title: 'Pug',
    description: 'Is this a good puggo?',
    path: 'sample-full.jpg'
  }
  try {
    path = await printer.prepareImage(testTask)
    // await printer.prepareImage('sample-landscape.jpg')
  } catch (e) {
    console.error(e)
  }

  try {
    await printer.printImage(path)
  } catch (e) {
    console.error(e)
  }
}

main()
