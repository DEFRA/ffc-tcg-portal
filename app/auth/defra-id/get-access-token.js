const Wreck = require('@hapi/wreck')
const { authConfig } = require('../../config')

const getAccessToken = async (code) => {
  const url = `https://${authConfig.tenant}.b2clogin.com/${authConfig.tenant}.onmicrosoft.com/${authConfig.policy}/oauth2/v2.0/token`

  const query = [
    `client_id=${authConfig.clientId}`,
    `client_secret=${authConfig.clientSecret}`,
    'grant_type=authorization_code',
    `scope=openid offline_access ${authConfig.clientId}`,
    `code=${code}`,
    `redirect_uri=${authConfig.redirectUrl}`
  ].join('&')

  const { payload } = await Wreck.post(`${url}?${query}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  })

  return payload
}

module.exports = {
  getAccessToken
}
