const { GET } = require('../constants/http-verbs')
const { serverConfig } = require('../config')
const { USER } = require('../auth/scopes')
const Wreck = require('@hapi/wreck')

module.exports = [{
  method: GET,
  path: '/people',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: async (request, h) => {
    const { payload: people } = await Wreck.get(`${serverConfig.abacoEndpoint}/party-registry/master/api-priv/v1/parties?lastName=%`, {
      headers: {
        authorization: `Bearer ${request.state.tcg_auth_token}`
      },
      redirects: 100,
      allowUnauthorized: true,
      json: true
    })
    return h.view('people', { people: people.records })
  }
}]
