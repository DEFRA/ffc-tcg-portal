const { sfi, bps, cs } = require('../config').schemeConfig

const getApplyUrl = (schemeName) => {
  switch (schemeName) {
    case 'sfi':
      return sfi.applyUrl
    case 'bps':
      return bps.applyUrl
    case 'cs':
      return cs.applyUrl
    default:
      return '/'
  }
}

module.exports = {
  getApplyUrl
}
