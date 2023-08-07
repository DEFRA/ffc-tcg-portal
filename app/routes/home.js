const { GET } = require('../../constants/verbs')

module.exports = [{
  method: GET,
  path: '/home',
  handler: (_request, h) => {
    return h.view('home')
  }
}]
