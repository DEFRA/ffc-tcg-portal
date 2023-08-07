const { authConfig } = require('../config')
const auth = authConfig.enabled ? require('./defra-auth') : require('./dev-auth')

module.exports = {
  ...auth
}
