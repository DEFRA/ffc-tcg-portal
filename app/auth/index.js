const { authConfig } = require('../config')
const auth = authConfig.defraIdEnabled ? require('./defra-id') : require('./dev')
const { validateToken } = require('./validate-token')
const { mapAuth } = require('./map-auth')

module.exports = {
  ...auth,
  validateToken,
  mapAuth
}
