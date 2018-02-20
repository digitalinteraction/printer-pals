/*
 Read from stdin and print tasks from QR codes
 Date: 19/02/18
 Author: Daniel Welsh
 */

const readline = require('readline')
const print = require('print')
const taskHelper = {}

let isPrinting = false
let printingStack = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

// TODO: Setup mongoose connection

// On a new line...
rl.on('line', async (line) => {
  console.log(`scanner: ${line}`)

  // Get the id from the line
  const taskId = line.split(':')[0]

  // get the task from id.
  const task = taskHelper.getTask(taskId)

  // print task
  await print.printTask(task)
})
