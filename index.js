const { pseudoElements, pseudoClasses, hasPluginFactory } = require('./lib')

function plugin({addVariant, e}) {
  const escape = hasPluginFactory ? e : (x => x)

  pseudoElements.forEach(pelement => {
    addVariant(pelement, ({modifySelectors, separator}) => {
      modifySelectors(({className}) => {
        return `.${escape(`${pelement}${separator}${className}`)}::${pelement}`
      })
    })
  })

  pseudoClasses.forEach(pclass => {
    pseudoElements.forEach(pelement => {
      addVariant(`${pclass}_${pelement}`, ({modifySelectors, separator}) => {
        modifySelectors(({className}) => {
          return `.${escape(`${pclass}${separator}${pelement}${separator}${className}`)}:${pclass}::${pelement}`
        })
      })
    })
  })
}

module.exports = hasPluginFactory ? require('tailwindcss/plugin')(plugin) : plugin
