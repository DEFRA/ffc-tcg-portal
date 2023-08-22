const { GET } = require('../constants/http-verbs')
// const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { USER } = require('../auth/scopes')
const Wreck = require('@hapi/wreck')

module.exports = [{
  method: GET,
  path: '/people',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    try {
      const people = await Wreck.get('http://ffc-tcg-abaco-agri-stub:3052/master/api-priv/v1/parties', {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        }
      })
      return h.view('people', { people })
    } catch (err) {
      throw new Error()
    }
  }
}]
