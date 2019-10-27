const NodeWebcam = require('node-webcam')
const azure = require('./azure')

const webcam = NodeWebcam.create({
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: 'jpeg',
  device: false,
  callbackReturn: 'buffer',
  verbose: false
})

setInterval(() => {
  webcam.capture('image', (err, data) => {
    azure.detectEmotions(data).then(emotions => {
      console.log(emotions[0]['emotion'])
    })
  })
}, 2000)


