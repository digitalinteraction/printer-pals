// Test that the printer properly processes and prints images
const printer = require('./print.js')

const main = async () => {
  let testTask = {
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
  } catch (e) {
    console.error(e)
  }
}

main()
