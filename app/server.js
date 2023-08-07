const Hapi = require('@hapi/hapi')
const { serverConfig } = require('./config')

const createServer = async () => {
  const server = Hapi.server({
    port: serverConfig.port
  })

  await server.register(require('@hapi/inert'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/crumb'))
  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/logging'))

  return server
}

module.exports = { createServer }
