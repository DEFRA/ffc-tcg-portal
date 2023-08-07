const Joi = require('joi')
const { GET, POST } = require('../constants/http-verbs')

module.exports = [{
  method: GET,
  path: '/how-to-sign-in',
  handler: (_request, h) => {
    return h.view('how-to-sign-in')
  }
},
{
  method: POST,
  path: '/how-to-sign-in',
  options: {
    validate: {
      payload: Joi.object({
        selection: Joi.string().required()
      }),
      failAction: async (request, h, _error) => {
        return h.view('how-to-sign-in', {
          message: 'Please select an option'
        }).takeover()
      }
    },
    handler: async (request, h) => {
      console.log(request.payload.selection)
      try {
        if (request.payload.selection === 'login') {
          return h.redirect('/sign-in')
        }
        return h.redirect('/register')
      } catch {
        return h.view('how-to-sign-in', {
          message: 'Please select an option'
        })
      }
    }
  }
}
]
