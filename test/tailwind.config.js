const plugin = require('..')

module.exports = {
  textColors: {
    black: '#22292f',
  },
  variants: {
    textColor: ['before', 'after', 'hover_before', 'hover_after'],
  },
  modules: {
    textColors: ['before', 'after', 'hover_before', 'hover_after'],
  },
  plugins: [plugin],
}
