const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/business',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (_request, h) => {
    return h.view('business')
  }
}]
