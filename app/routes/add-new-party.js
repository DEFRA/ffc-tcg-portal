const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { serverConfig } = require('../config')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/add-new-party',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    return h.view('add-new-party')
  }
},
{
  method: POST,
  path: '/add-new-party',
  options: {
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('/add-new-party', {
          message: 'First name and last name are required'
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    await Wreck.post(`${serverConfig.abacoEndpoint}/party-registry/master/api-priv/v1/parties`,
      {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        },
        payload: {
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          partyType: 'N',
          taxCode: 'AAAAAAAAAAAAAAAA',
          code: (Math.random() * 100).toString(36).slice(4, 8) // generates a random 4 digit alphanumeric string
        },
        rejectUnauthorized: false
      })
    return h.redirect('/people')
  }
}
]
