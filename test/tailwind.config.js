module.exports = {
  textColors: {
    'black': '#22292f',
  },
  variants: {
    textColor: ['before', 'after'],
  },
  modules: {
    textColors: ['before', 'after'],
  },
  plugins: [
      require('../')
  ],
}
