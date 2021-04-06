const tailwindcssPlugin = require('tailwindcss/plugin')

const addContentUtilities = require('./content-utilities')
const { pseudoElements, pseudoClasses } = require('./lib')

const defaultOptions = {
  customPseudoElements: [],
  customPseudoClasses: [],
  contentUtilities: {
    prefix: 'tw-content',
  },
  classNameReplacer: {},
  emptyContent: true,
  multiplePseudoClasses: [],
}

const plugin = tailwindcssPlugin.withOptions((options = defaultOptions) => {
  const pluginConfig = {
    ...defaultOptions,
    ...options,
  }

  if (!Array.isArray(pluginConfig.customPseudoElements)) {
    throw new Error('`customElements` must be an array of string.')
  }

  if (!Array.isArray(pluginConfig.customPseudoClasses)) {
    throw new Error('`customClasses` must be an array of string.')
  }

  if (
    pluginConfig.contentUtilities !== false &&
    typeof pluginConfig.contentUtilities !== 'object'
  ) {
    pluginConfig.contentUtilities = defaultOptions.contentUtilities
  }

  if (
    typeof pluginConfig.classNameReplacer !== 'object' ||
    Array.isArray(pluginConfig.classNameReplacer)
  ) {
    throw new Error('`classNameReplacer` must be an object.')
  }

  pluginConfig.multiplePseudoClasses = pluginConfig.multiplePseudoClasses.map(
    (s) => s.split(':').slice(1)
  )

  const namer = (name) => {
    return typeof pluginConfig.classNameReplacer === 'object' &&
      name in pluginConfig.classNameReplacer &&
      pluginConfig.classNameReplacer[name]
      ? pluginConfig.classNameReplacer[name]
      : name
  }
  const mergedPseudoElements = Array.from(
    new Set(pseudoElements.concat(pluginConfig.customPseudoElements))
  )
  const mergedPseudoClasses = Array.from(
    new Set(pseudoClasses.concat(pluginConfig.customPseudoClasses))
  )

  return ({ addUtilities, addVariant, e }) => {
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
          `${pclass}::${pelement}`,
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

    pluginConfig.multiplePseudoClasses.forEach((pclassList) => {
      const selector = pclassList.join(':')

      addVariant(selector, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            namer(`${pclassList.join(separator)}${separator}${className}`)
          )}:${selector}`
        })
      })

      mergedPseudoElements.forEach((pelement) => {
        addVariant(
          `${selector}::${pelement}`,
          ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${e(
                namer(
                  `${pclassList.join(
                    separator
                  )}${separator}${pelement}${separator}${className}`
                )
              )}:${selector}::${pelement}`
            })
          }
        )
      })
    })

    if (pluginConfig.contentUtilities) {
      addContentUtilities({
        addUtilities,
        namer,
        prefix:
          'prefix' in pluginConfig.contentUtilities
            ? pluginConfig.contentUtilities.prefix
            : defaultOptions.contentUtilities.prefix,
        pseudoClasses: mergedPseudoClasses,
      })
    }

    if (pluginConfig.emptyContent) {
      addUtilities(
        {
          [`.${namer('empty-content')}`]: {
            content: "''",
          },
        },
        ['before']
      )
    }
  }
})

module.exports = plugin
