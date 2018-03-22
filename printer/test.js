// Test that the printer properly processes and prints images
const printer = require('./print.js')

const main = async () => {
  // Dummy task object
  let testTask = {
    _id: '34567394h65374f563f479sd5jdf45',
    title: 'Pug',
    description: 'Is this a good puggo?',
    path: 'sample-full.jpg'
  }
  try {
    testTask.path = await printer.prepareImage(testTask)
  } catch (e) {
    console.error(e)
  }

  try {
    await printer.printImage(testTask)
    await printer.printQRCode(testTask)
  } catch (e) {
    console.error(e)
  }
}

main()
