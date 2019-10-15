const pseudoElements = require('./pseudo-elements')

module.exports = function({addVariant, e}) {
  const escape = e || (x => x)
  pseudoElements.forEach(pseudo => {
    addVariant(pseudo, ({modifySelectors, separator}) => {
      modifySelectors(({className}) => {
        return `.${escape(`${pseudo}${separator}${className}`)}::${pseudo}`
      })
    })
  })
}
