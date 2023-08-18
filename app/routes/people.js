const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

const people = [
  {
    id: 1,
    name: 'Simon Dunn'
  },
  {
    id: 2,
    name: 'Luke Skywalker'
  }
]

module.exports = [{
  method: GET,
  path: '/people',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (_request, h) => {
    return h.view('people', { people })
  }
}]
