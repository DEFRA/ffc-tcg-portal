const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/user-permissions',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    const user = { name: request.query.user }
    return h.view('user-permissions', user)
  }
},
{
  method: POST,
  path: '/people/user-permissions',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    try {
      const user = request.payload
      // get all users
      const promise = Wreck.request(GET, 'http://ffc-tcg-abaco-agri-stub:3052/master/api-priv/v1/parties', {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        }
      })
      const res = await promise
      const users = await Wreck.read(res, { json: true })

      // find by name to get ID
      const foundUser = users.find((person) => {
        return `${person.firstname} ${person.lastname}` === user.name
      })
      await Wreck.delete(`http://ffc-tcg-abaco-agri-stub:3052/master/api-priv/v1/parties/${foundUser.id}`, {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        }
      })
      return h.redirect('/people', { users })
    } catch (err) {
      throw new Error()
    }
  }
}
]
