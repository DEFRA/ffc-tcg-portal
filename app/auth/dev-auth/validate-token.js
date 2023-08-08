const validateToken = async (decoded, _request, _h) => {
  // for development, no need to validate token, will always assume token is valid
  return { isValid: true }
}

module.exports = {
  validateToken
}
