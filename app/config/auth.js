const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object().keys({
  defraIdEnabled: Joi.bool().default(false),
  tenant: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().optional().allow('') }),
  clientId: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  clientSecret: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  serviceId: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  policy: Joi.alternatives().conditional('defraIdEnabled', { is: true, then: Joi.string().required(), otherwise: Joi.string().allow('') }),
  redirectUrl: Joi.string().default('http://localhost:3000/sign-in-oidc'),
  jwtConfig: Joi.object({
    expiryInMinutes: Joi.number().default(60)
  }),
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24), // 24 hours
    encoding: Joi.string().default('none'),
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true)
  })
})

const config = {
  defraIdEnabled: process.env.DEFRA_ID_ENABLED,
  tenant: process.env.DEFRA_ID_TENANT,
  clientId: process.env.DEFRA_ID_CLIENT_ID,
  clientSecret: process.env.DEFRA_ID_CLIENT_SECRET,
  serviceId: process.env.DEFRA_ID_SERVICE_ID,
  redirectUrl: process.env.DEFRA_ID_REDIRECT_URL,
  policy: process.env.DEFRA_ID_POLICY,
  jwtConfig: {
    expiryInMinutes: process.env.JWT_EXPIRY_IN_MINUTES
  },
  cookieOptions: {
    ttl: process.env.AUTH_COOKIE_TTL,
    encoding: process.env.AUTH_COOKIE_ENCODING,
    isSameSite: process.env.AUTH_COOKIE_SAME_SITE,
    isSecure: process.env.NODE_ENV === PRODUCTION,
    isHttpOnly: process.env.AUTH_COOKIE_HTTP_ONLY,
    clearInvalid: process.env.AUTH_COOKIE_CLEAR_INVALID,
    strictHeader: process.env.AUTH_COOKIE_STRICT_HEADER
  }
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The authentication config is invalid. ${error.message}`)
}

module.exports = value
