const pseudoElements = require('./pseudo-elements')

module.exports = function({addVariant}) {
  pseudoElements.forEach(pseudo => {
    addVariant(pseudo, ({modifySelectors, separator}) => {
      modifySelectors(({className}) => {
        return `.${pseudo}${separator}${className}::${pseudo}`
      })
    })
  })
}
