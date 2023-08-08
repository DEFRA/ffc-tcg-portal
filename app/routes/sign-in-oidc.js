const { GET } = require('../constants/http-verbs')
const { OK } = require('../constants/ok')

module.exports = {
  method: GET,
  path: '/sign-in-oidc',
  handler: (request, h) => {
    return h.response(OK).code(200)
  }
}
