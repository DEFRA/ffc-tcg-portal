const { GET } = require('../constants/http-verbs')
const { serverConfig } = require('../config')
const { USER } = require('../auth/scopes')
const Wreck = require('@hapi/wreck')

module.exports = [{
  method: GET,
  path: '/people',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    const promise = Wreck.request(GET, `${serverConfig.abacoEndpoint}/master/api-priv/v1/parties`, {
      headers: {
        authorization: `Bearer ${request.state.tcg_auth_token}`
      }
    })
    const res = await promise
    const people = await Wreck.read(res, { json: true })
    return h.view('people', { people })
  }
}]
