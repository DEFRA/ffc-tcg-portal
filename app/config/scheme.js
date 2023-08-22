const Joi = require('joi')

const schema = Joi.object().keys({
  sfi: Joi.object({
    applyUrl: Joi.string().uri().required()
  }).required(),
  bps: Joi.object({
    applyUrl: Joi.string().uri().required()
  }).required(),
  cs: Joi.object({
    applyUrl: Joi.string().uri().required()
  }).required()
})

const config = {
  sfi: {
    applyUrl: process.env.SFI_APPLY_URL
  },
  bps: {
    applyUrl: process.env.BPS_APPLY_URL
  },
  cs: {
    applyUrl: process.env.CS_APPLY_URL
  }
}

const { error, value } = schema.validate(config)

if (error) {
  throw new Error(`The scheme config is invalid. ${error.message}`)
}

module.exports = value
