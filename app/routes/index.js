const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/',
  handler: (request, h) => {
    return h.view('index')
  }
}
