
module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    const environment = process.env.ENVIRONMENT_CODE
    const applyLink = environment === 'local' ? 'http://localhost:3055/' : `https://ffc-tcg-apply-${environment}.azure.defra.cloud/`
    return h.view('index', { applyLink })
  }
}
