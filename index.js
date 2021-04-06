const tailwindcssPlugin = require('tailwindcss/plugin')

const addContentUtilities = require('./content-utilities')
const { pseudoElements, pseudoClasses } = require('./lib')

const plugin = tailwindcssPlugin.withOptions((options = {}) => {
  return ({ addUtilities, addVariant, e }) => {
    const customPseudoElements = options.customPseudoElements || []
    const customPseudoClasses = options.customPseudoClasses || []
    const contentUtilities =
      options.contentUtilities || options.contentUtilities !== false

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
          return `.${e(`${pelement}${separator}${className}`)}::${pelement}`
        })
      })
    })

    mergedPseudoClasses.forEach((pclass) => {
      mergedPseudoElements.forEach((pelement) => {
        addVariant(
          `${pclass}_${pelement}`,
          ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${e(
                `${pclass}${separator}${pelement}${separator}${className}`
              )}:${pclass}::${pelement}`
            })
          }
        )
      })
    })

    if (contentUtilities) {
      addContentUtilities({
        addUtilities,
        prefix:
          typeof contentUtilities === 'object' && 'prefix' in contentUtilities
            ? contentUtilities.prefix || 'tw-content'
            : 'tw-content',
        pseudoClasses: mergedPseudoClasses,
      })
    }
  }
})

module.exports = plugin
