const Joi = require('joi')
const { GET, POST } = require('../constants/http-verbs')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')
const { authorize } = require('../auth')

module.exports = [{
  method: GET,
  path: '/sign-in',
  options: {
    auth: false,
    handler: (_request, h) => {
      return h.view('sign-in')
    }
  }
},
{
  method: POST,
  path: '/sign-in',
  options: {
    validate: {
      payload: Joi.object({
        crn: Joi.number().integer().required(),
        password: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('sign-in', {
          message: 'Your CRN and/or password is incorrect',
          crn: request.payload.crn
        }).takeover()
      }
    },
    handler: async (request, h) => {
      try {
        const authToken = await authorize(request)
        return h.redirect('/home')
          .header('Authorization', authToken)
          .state(AUTH_COOKIE_NAME, authToken)
      } catch {
        return h.view('sign-in', {
          message: 'Your CRN and/or password is incorrect',
          crn: request.payload.crn
        })
      }
    }
  }
}]
