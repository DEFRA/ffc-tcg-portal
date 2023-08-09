const { authConfig } = require('../../config')

const getAuthorizationUrl = () => {
  const host = `https//:${authConfig.tenant}.b2clogin.com`
  const path = `/${authConfig.tenant}.onmicrosoft.com/${authConfig.policy}/oauth2/v2.0/authorize`
  const query = [
    `client_id=${authConfig.clientId}`,
    `service_id=${authConfig.serviceId}`,
    'nonce=defaultNonce',
    `redirect_uri=${authConfig.redirectUrl}`,
    `scope=openid offline_access ${authConfig.clientId}`,
    'response_type=code',
    'response_mode=form_post'
  ].join('&')
  return `${host}${path}?${query}`
}

module.exports = {
  getAuthorizationUrl
}
