const tailwindcssPlugin = require('tailwindcss/plugin')

const addContentUtilities = require('./content-utilities')
const { pseudoElements, pseudoClasses } = require('./lib')

const plugin = tailwindcssPlugin.withOptions((options = {}) => {
  return ({ addUtilities, addVariant, e }) => {
    const customPseudoElements = options.customPseudoElements || []
    const customPseudoClasses = options.customPseudoClasses || []
    const contentUtilities =
      options.contentUtilities || options.contentUtilities !== false
    const classNameReplacer = options.classNameReplacer || {}

    if (!Array.isArray(customPseudoElements)) {
      throw new Error('`customElements` must be an array of string.')
    }

    if (!Array.isArray(customPseudoClasses)) {
      throw new Error('`customClasses` must be an array of string.')
    }

    const namer = (name) => {
      return typeof classNameReplacer === 'object' &&
        name in classNameReplacer &&
        classNameReplacer[name]
        ? classNameReplacer[name]
        : name
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
          return `.${e(
            namer(`${pelement}${separator}${className}`)
          )}::${pelement}`
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
                namer(
                  `${pclass}${separator}${pelement}${separator}${className}`
                )
              )}:${pclass}::${pelement}`
            })
          }
        )
      })
    })

    if (contentUtilities) {
      addContentUtilities({
        addUtilities,
        namer,
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
