const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/static'),
  require('../routes/'),
  require('../routes/sign-in'),
  require('../routes/sign-in-oidc'),
  require('../routes/sign-out'),
  require('../routes/home'),
  require('../routes/business-hub'),
  require('../routes/people'),
  require('../routes/user-permissions'),
  require('../routes/add-new-party'),
  require('../routes/edit-party'),
  require('../routes/grants-and-payments'),
  require('../routes/apply')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
