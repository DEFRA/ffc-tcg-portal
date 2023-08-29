
const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
const { API_URL } = require('../constants/api-url')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/people/user-permissions',
  options: { auth: { strategy: 'jwt', scope: [USER] } },
  handler: (request, h) => {
    const user = {
      name: request.query.user,
      id: request.query.id
    }
    return h.view('user-permissions', user)
  }
},
{
  method: POST,
  path: '/people/user-permissions/delete',
  options: {
    auth: { strategy: 'jwt', scope: [USER] },
    validate: {
      payload: Joi.object({
        id: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('user-permissions', {
          message: 'Something went wrong, please try again'
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    try {
      await Wreck.delete(`${API_URL}/master/api-priv/v1/parties/${request.payload.id}`, {
        headers: {
          authorization: `Bearer ${request.state.tcg_auth_token}`
        }
      })
      return h.redirect('/people')
    } catch (err) {
      throw new Error()
    }
  }
}
]
