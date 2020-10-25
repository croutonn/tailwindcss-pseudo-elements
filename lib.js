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
    'selection',
  ],

  pseudoClasses: [
    'active',
    'checked',
    'disabled',
    'empty',
    'enabled',
    'first-child',
    'first-of-type',
    'focus',
    'hover',
    'in-range',
    'invalid',
    // 'lang(language)',
    'last-child',
    'last-of-type',
    'link',
    // 'not(selector)',
    // 'nth-child(n)',
    // 'nth-last-child(n)',
    // 'nth-last-of-type(n)',
    // 'nth-of-type(n)',
    'only-of-type',
    'only-child',
    'optional',
    'out-of-range',
    'read-only',
    'read-write',
    'required',
    'root',
    'target',
    'valid',
    'visite',
  ],

  hasPluginFactory: (() => {
    try {
      require.resolve('tailwindcss/plugin')
    } catch (e) {
      return false
    }
    return true
  })(),
}
