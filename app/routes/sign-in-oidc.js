const { authConfig } = require('../config')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/sign-in-oidc',
  handler: (request, h) => {
    // do stuff to validate defra id token
    const token = 'whatever'

    return h.redirect('/home')
      .state(AUTH_COOKIE_NAME, token, authConfig.cookieOptions)
  }
}
