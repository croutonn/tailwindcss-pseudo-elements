const addContentUtilities = ({ addUtilities, prefix, pseudoClasses }) => {
  const targetPseudoElements = ['before', 'after']
  const utilities = targetPseudoElements.reduce((icurrent, pseudoElement) => {
    return {
      ...icurrent,
      [`.content-${pseudoElement}::${pseudoElement}`]: {
        content: `attr(${prefix}-${pseudoElement})`,
      },
      ...pseudoClasses.reduce((jcurrent, pseudoClass) => {
        return {
          ...jcurrent,
          [`.content-${pseudoClass}-${pseudoElement}:${pseudoClass}::${pseudoElement}`]: {
            content: `attr(${prefix}-${pseudoClass}-${pseudoElement})`,
          },
        }
      }, {}),
    }
  }, {})
  addUtilities(utilities)
}

module.exports = addContentUtilities
