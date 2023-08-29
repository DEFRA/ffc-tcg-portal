const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { API_URL } = require('../constants/api-url')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/edit-party',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    const user = {
      name: request.query.user,
      id: request.query.id
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
        userid: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('edit-party', {
          message: 'First name and last name are required'
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    try {
      await Wreck.put(`${API_URL}/master/api-priv/v1/parties/${request.payload.userid}`,
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
    } catch (err) {
      throw new Error()
    }
  }
}
]
