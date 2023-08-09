const validateToken = async (decoded, _request, _h) => {
  return { isValid: true, credentials: { scope: decoded.roles } }
}

module.exports = {
  validateToken
}
