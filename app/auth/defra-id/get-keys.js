const Wreck = require('@hapi/wreck')
const jwkToPem = require('jwk-to-pem')
const { authConfig } = require('../../config')

const getKeys = async () => {
  const url = `https://${authConfig.tenant}.b2clogin.com/${authConfig.tenant}.onmicrosoft.com/${authConfig.policy}/discovery/v2.0/keys`
  const { payload } = await Wreck.get(url, {
    json: true
  })

  const { keys } = payload
  return jwkToPem(keys[0])
}

module.exports = {
  getKeys
}
