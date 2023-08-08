const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../../config').authConfig
const { USER } = require('../scopes')

const createToken = (crn) => {
  return jwt.sign({ userId: crn, scope: [USER] }, jwtConfig.secret, {
    expiresIn: `${jwtConfig.expiryInMinutes}m`
  })
}

module.exports = {
  createToken
}
