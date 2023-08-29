const { GET } = require('../constants/http-verbs')
const { API_URL } = require('../constants/api-url')
const { USER } = require('../auth/scopes')
const Wreck = require('@hapi/wreck')

module.exports = [{
  method: GET,
  path: '/people',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    try {
      const promise = Wreck.request(GET, `${API_URL}/master/api-priv/v1/parties`, {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        }
      })
      const res = await promise
      const people = await Wreck.read(res, { json: true })
      return h.view('people', { people })
    } catch (err) {
      throw new Error()
    }
  }
}]
