const { jwtConfig } = require('../config')
const { validate } = require('../auth')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

module.exports = {
  plugin: {
    name: 'auth',
    register: (server, _options) => {
      server.auth.strategy('jwt', 'jwt', {
        key: jwtConfig.secret,
        validate,
        cookieKey: AUTH_COOKIE_NAME
      })
      server.auth.default({ strategy: 'jwt', mode: 'try' })
    }
  }
}
