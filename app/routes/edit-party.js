const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { serverConfig } = require('../config')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/edit-party',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    const user = {
      name: request.query.user,
      id: request.query.id,
      code: request.query.code
    }
    return h.view('edit-party', { user })
  }
},
{
  method: POST,
  path: '/people/edit-party',
  options: {
    validate: {
      payload: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userid: Joi.string().required(),
        code: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('edit-party', {
          message: 'First name and last name are required'
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    await Wreck.put(`${serverConfig.abacoEndpoint}/party-registry/master/api-priv/v1/parties/${request.payload.userid}`,
      {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        },
        payload: {
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          partyType: 'N',
          code: request.payload.code
        },
        rejectUnauthorized: false
      })
    return h.redirect('/people')
  }
}
]
