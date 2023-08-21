const Joi = require('joi')
const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')

module.exports = [{
  method: GET,
  path: '/apply',
  options: {
    auth: { strategy: 'jwt', scope: [USER] },
    validate: {
      query: {
        scheme: Joi.string().required()
      },
      failAction: async (request, h, error) => {
        return h.redirect('/grants-and-payments')
      }
    }
  },
  handler: (_request, h) => {
    return h.redirect('/')
  }
}]
