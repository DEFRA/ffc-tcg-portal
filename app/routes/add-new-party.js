const Joi = require('joi')
const Wreck = require('@hapi/wreck')
const { GET, POST } = require('../constants/http-verbs')
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
        firstname: Joi.string().required(),
        lastname: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('sign-in', {
          message: 'First name and last name are required'
        }).takeover()
      }
    }
  },
  handler: async (request, h) => {
    console.log('add-new-party')
    console.log(request.payload.firstname)

    try {
      await Wreck.post('http://ffc-tcg-abaco-agri-stub:3052/master/api-priv/v1/parties',
        {
          headers: {
            authorization: `Bearer ${request.state.tcg_auth_token}`
          },
          payload: {
            firstname: request.payload.firstname,
            lastname: request.payload.lastname
          }
        })
      return h.redirect('/people')
    } catch (err) {
      throw new Error()
    }
  }
}
]
