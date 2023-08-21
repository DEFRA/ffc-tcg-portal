const Joi = require('joi')
const { GET } = require('../constants/http-verbs')
const { USER } = require('../auth/scopes')
const { getApplyUrl } = require('../schemes')

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
  handler: (request, h) => {
    const applyUrl = getApplyUrl(request.query.scheme)
    return h.redirect(applyUrl)
      .header('Authorization', `Bearer ${request.state.AUTH_COOKIE_NAME}`)
  }
}]
