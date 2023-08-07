const Joi = require('joi')
const { GET, POST } = require('../constants/http-verbs')

module.exports = [{
  method: GET,
  path: '/how-to-sign-in',
  handler: (_request, h) => {
    return h.view('how-to-sign-in')
  }
}
// {
//   method: POST,
//   path: '/sign-in',
//   options: {
//     validate: {
//       payload: Joi.object({
//         crn: Joi.number().integer().required(),
//         password: Joi.string().required()
//       }),
//       failAction: async (request, h, _error) => {
//         return h.view('sign-in', {
//           message: 'Your CRN and/or password is incorrect',
//           crn: request.payload.crn
//         }).takeover()
//       }
//     },
//     handler: async (request, h) => {
//       try {
//         return h.redirect('/home')
//       } catch {
//         return h.view('sign-in', {
//           message: 'Your CRN and/or password is incorrect',
//           crn: request.payload.crn
//         })
//       }
//     }
//   }
// }
]
