const plugin = require('..')

module.exports = {
  textColors: {
    black: '#22292f',
  },
  variants: {
    extend: {
      textColor: ['before', 'after', 'hover_before', 'hover_after', 'foo_bar'],
    },
  },
  modules: {
    textColors: ['before', 'after', 'hover_before', 'hover_after', 'foo_bar'],
  },
  plugins: [plugin()],
  customPseudoClasses: ['foo'],
  customPseudoElements: ['bar'],
}
