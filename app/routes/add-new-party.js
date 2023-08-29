const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { API_URL } = require('../constants/api-url')
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
    await Wreck.post(`${API_URL}/master/api-priv/v1/parties`,
      {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        },
        payload: {
          firstName: request.payload.firstName,
          lastName: request.payload.lastName
        }
      })
    return h.redirect('/people')
  }
}
]
