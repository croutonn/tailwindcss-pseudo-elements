const addContentUtilities = require('./content-utilities')
const { pseudoElements, pseudoClasses, hasPluginFactory } = require('./lib')

const plugin = ({ addUtilities, addVariant, e, config }) => {
  const escape = hasPluginFactory ? e : (x) => x
  const customPseudoElements = config
    ? config('customPseudoElements') || []
    : []
  const customPseudoClasses = config ? config('customPseudoClasses') || [] : []

  if (!Array.isArray(customPseudoElements)) {
    throw new Error('`customElements` must be an array of string.')
  }

  if (!Array.isArray(customPseudoClasses)) {
    throw new Error('`customClasses` must be an array of string.')
  }

  const mergedPseudoElements = Array.from(
    new Set(pseudoElements.concat(customPseudoElements))
  )
  const mergedPseudoClasses = Array.from(
    new Set(pseudoClasses.concat(customPseudoClasses))
  )

  mergedPseudoElements.forEach((pelement) => {
    addVariant(pelement, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${escape(`${pelement}${separator}${className}`)}::${pelement}`
      })
    })
  })

  mergedPseudoClasses.forEach((pclass) => {
    mergedPseudoElements.forEach((pelement) => {
      addVariant(`${pclass}_${pelement}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${escape(
            `${pclass}${separator}${pelement}${separator}${className}`
          )}:${pclass}::${pelement}`
        })
      })
    })
  })

  addContentUtilities({
    addUtilities,
    prefix: 'tw-content',
    pseudoClasses: mergedPseudoClasses,
  })
}

module.exports = hasPluginFactory
  ? require('tailwindcss/plugin')(plugin)
  : plugin
