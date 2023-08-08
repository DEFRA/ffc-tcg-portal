const { authConfig } = require('../config')
const auth = authConfig.enabled ? require('./defra-auth') : require('./dev-auth')
const { mapAuth } = require('./map-auth')

module.exports = {
  ...auth,
  mapAuth
}
