const SerialPort = require('serialport')
const Printer = require('thermalprinter')

const loc = '/dev/serial0'
const baudrate = 19200

const port = new SerialPort(loc, {baudRate: baudrate})

port.on('open', () => {
  const printer = new Printer(port)
  printer.horizontalLine(16)
    .printLine('Printers are lit!')
    .bold(true)
    .inverse(true)
    .printLine('Super Lit')
    .print(() => {
      console.log('Finished')
      process.exit()
    })
})
