const pseudoElements = require('./pseudo-elements')

module.exports = function({addVariant, e}) {
  pseudoElements.forEach(pseudo => {
    addVariant(pseudo, ({modifySelectors, separator}) => {
      modifySelectors(({className}) => {
        return `.${e(`${pseudo}${separator}${className}`)}::${pseudo}`
      })
    })
  })
}
