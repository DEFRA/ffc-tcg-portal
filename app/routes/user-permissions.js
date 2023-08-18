const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/user-permissions',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    const user = { name: request.query.user }
    console.log(user)
    return h.view('user-permissions', user)
  }
}]
