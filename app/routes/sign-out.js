const { GET } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

module.exports = [{
  method: GET,
  path: '/sign-out',
  handler: (_request, h) => {
    return h.redirect('/sign-in')
      .unstate(AUTH_COOKIE_NAME)
  }
}]
