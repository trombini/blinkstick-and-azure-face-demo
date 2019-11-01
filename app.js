const NodeWebcam = require('node-webcam')
const blinkstick = require('blinkstick')

const azure = require('./azure')
const led = blinkstick.findFirst()

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

const Colors = {
  PINK: '#E400E0'
}

const changeColor = (color) => led.setColor(color, () => {})

const getColorForEmotion = (emotion) => {
  if (emotion === 'neutral') return 'blue'
  else if (emotion === 'happiness') return Colors.PINK
  else if (emotion === 'surprise') return Colors.PINK
  else if (emotion === 'anger') return 'red'
  else if (emotion === 'sadness') return 'random'
  else return 'random'
}

setInterval(() => {
  webcam.capture('image', (err, data) => {
    azure.detectEmotions(data).then(emotions => {
      const emotion = emotions[0]['emotion']
      const color = getColorForEmotion(emotion)
      changeColor(getColorForEmotion(color))
      console.log(color, emotion)
    })
  })
}, 4000)


