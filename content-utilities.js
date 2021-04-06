const addContentUtilities = ({
  addUtilities,
  namer,
  prefix,
  pseudoClasses,
}) => {
  const targetPseudoElements = ['before', 'after']
  const utilities = targetPseudoElements.reduce((icurrent, pseudoElement) => {
    return {
      ...icurrent,
      [`.${namer(`content-${pseudoElement}`)}::${pseudoElement}`]: {
        content: `attr(${prefix}-${pseudoElement})`,
      },
      ...pseudoClasses.reduce((jcurrent, pseudoClass) => {
        return {
          ...jcurrent,
          [`.${namer(
            `content-${pseudoClass}-${pseudoElement}`
          )}:${pseudoClass}::${pseudoElement}`]: {
            content: `attr(${prefix}-${pseudoClass}-${pseudoElement})`,
          },
        }
      }, {}),
    }
  }, {})
  addUtilities(utilities)
}

module.exports = addContentUtilities
