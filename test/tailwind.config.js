const plugin = require('..')

module.exports = {
  textColors: {
    black: '#22292f',
  },
  variants: {
    extend: {
      textColor: [
        'before',
        'after',
        'hover::before',
        'hover::after',
        'foo::bar',
      ],
    },
  },
  plugins: [
    plugin({
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
    }),
  ],
}
