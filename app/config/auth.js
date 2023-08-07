const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object().keys({
  enabled: Joi.bool().default(false),
  endpoint: Joi.alternatives().conditional('enabled', { is: true, then: Joi.string().uri().required(), otherwise: Joi.string().optional() }),
  jwtConfig: Joi.object({
    secret: Joi.string()
  }),
  cookieOptions: Joi.object({
    ttl: Joi.number().default(1000 * 60 * 60 * 24), // 24 hours
    encoding: 'none',
    isSameSite: Joi.string().valid('Lax').default('Lax'),
    isSecure: Joi.bool().default(true),
    isHttpOnly: Joi.bool().default(true),
    clearInvalid: Joi.bool().default(false),
    strictHeader: Joi.bool().default(true)
  })
})

const config = {
  enabled: process.env.AUTH_ENABLED,
  endpoint: process.env.AUTH_ENDPOINT,
  jwtConfig: {
    secret: process.env.JWT_SECRET
  },
  cookieOptions: {
    ttl: process.env.COOKIE_TTL,
    encoding: process.env.COOKIE_ENCODING,
    isSameSite: process.env.COOKIE_SAME_SITE,
    isSecure: process.env.NODE_ENV === PRODUCTION,
    isHttpOnly: process.env.COOKIE_HTTP_ONLY,
    clearInvalid: process.env.COOKIE_CLEAR_INVALID,
    strictHeader: process.env.COOKIE_STRICT_HEADER
  }
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The authentication config is invalid. ${error.message}`)
}

module.exports = value
