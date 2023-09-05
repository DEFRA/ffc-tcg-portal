const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/grants-and-payments',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (_request, h) => {
    return h.view('grants-and-payments')
  }
}]
