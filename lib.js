module.exports = {
  pseudoElements: [
    'after',
    'backdrop ',
    'before',
    'cue',
    'first-letter',
    'first-line',
    'grammar-error ',
    'marker ',
    'placeholder ',
    'selection'
  ],

  hasPluginFactory: function() {
    try {
      require.resolve('tailwindcss/plugin')
    } catch (e) {
      return false
    }
    return true
  }()
}
