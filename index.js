const { pseudoElements, hasPluginFactory } = require('./lib')

function plugin({addVariant, e}) {
  const escape = hasPluginFactory ? e : (x => x)
  pseudoElements.forEach(pseudo => {
    addVariant(pseudo, ({modifySelectors, separator}) => {
      modifySelectors(({className}) => {
        return `.${escape(`${pseudo}${separator}${className}`)}::${pseudo}`
      })
    })
  })
}

module.exports = hasPluginFactory ? require('tailwindcss/plugin')(plugin) : plugin
