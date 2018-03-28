const qr = require('./qrcode')

async function main () {
  const taskId = '5ab26aa71427f70797d1a7c7'
  await qr.generateQR(`task:${taskId}`)
}

main()
