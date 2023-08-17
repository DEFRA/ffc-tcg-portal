const { authConfig } = require('../../config')

const getAuthorizationUrl = () => {
  const host = `https://${authConfig.tenant}.b2clogin.com`
  const path = `/${authConfig.tenant}.onmicrosoft.com/oauth2/v2.0/authorize`
  const query = [
    `p=${authConfig.policy}`,
    `client_id=${authConfig.clientId}`,
    `serviceId=${authConfig.serviceId}`,
    'nonce=defaultNonce',
    `redirect_uri=${authConfig.redirectUrl}`,
    `scope=openid offline_access ${authConfig.clientId}`,
    'response_type=code',
    'prompt=login',
    'response_mode=form_post'
  ].join('&')
  return encodeURI(`${host}${path}?${query}`)
}

module.exports = {
  getAuthorizationUrl
}
