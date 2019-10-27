const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  azureSubscriptionKey: process.env.AZURE_SUBSCRIPTION_KEY,
  azureRegion: process.env.AZURE_REGION || 'hans'
}
