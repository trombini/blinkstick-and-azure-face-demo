const axios = require('axios')
const _ = require('lodash')
const config = require('./config')

const sortByMainEmotion = (emotions) => {
  const emotionsArrray = _.map(emotions, (score, emotion) => ({ score, emotion }))
  //const filteredEmotions = emotionsArrray
  const filteredEmotions = _.filter(emotionsArrray, element => element.emotion !== 'neutral')
  return _.reverse(_.sortBy(filteredEmotions, 'score'))
}

const detectEmotions = (imageBuffer) => {
  return detectFaces(imageBuffer).then(faces => {
    const face = _.head(faces)
    const { emotion: emotions} = face.faceAttributes
    return sortByMainEmotion(emotions)
  }).catch(error => {
    console.log(error)
  })
}

function detectFaces(data) {
  return axios({
    url: `https://${config.azureRegion}.api.cognitive.microsoft.com/face/v1.0/detect`,
    method: 'post',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': config.azureSubscriptionKey
    },
    params: {
      returnFaceId: false,
      returnFaceLandmarks: false,
      returnFaceAttributes: 'emotion'
    },
    data
  }).then((response) => {
    return response.data
  })
}

module.exports = {
  detectFaces,
  detectEmotions
}
