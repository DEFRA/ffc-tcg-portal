const environment = process.env.ENVIRONMENT_CODE
const API_URL = environment === 'local' ? 'http://ffc-tcg-abaco-agri-stub:3052' : `https://ffc-tcg-abaco-agri-stub-${environment}.azure.defra.cloud`

module.exports = {
  API_URL
}
