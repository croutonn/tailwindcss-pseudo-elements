const { assert } = require('chai')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const plugin = require('..')

const baseConfig = require('./tailwind.config')

const createProcessor = (config = {}) =>
  postcss([tailwindcss({ ...baseConfig, ...config })])

describe('Basic Usage', () => {
  it('@tailwind', async () => {
    const testData = `@tailwind utilities;`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.before\\:text-black::before')
    assert.include(
      css,
      '.content-before::before {\n  content: attr(tw-content-before)\n}'
    )
    assert.include(css, '.before\\:empty-content::before')
  })

  it('@variants', async () => {
    const testData = `@variants after,before{.text-blue{color:blue}}`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.after\\:text-blue::after')
    assert.include(css, '.before\\:text-blue::before')
  })
})

describe('with pseudo-classes', () => {
  it('@tailwind', async () => {
    const testData = `@tailwind utilities;`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.hover\\:before\\:text-black:hover::before')
  })

  it('@variants', async () => {
    const testData = `@variants hover::after,hover::before{.text-blue{color:blue}}`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.hover\\:after\\:text-blue:hover::after')
    assert.include(css, '.hover\\:before\\:text-blue:hover::before')
  })
})

describe('with configuration', () => {
  it('Turn off the Content Property Utilities', async () => {
    const testData = `@tailwind utilities;`
    const options = {
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      contentUtilities: false,
    }
    const { css } = await createProcessor({
      plugins: [plugin(options)],
    }).process(testData, {
      from: '',
      to: '',
    })

    assert.notInclude(
      css,
      '.content-before::before {\n  content: attr(tw-content-before)\n}'
    )
  })

  it('Class Name Replacer', async () => {
    const testData = `@tailwind utilities;`
    const options = {
      emptyContent: true,
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      classNameReplacer: {
        'hover:before:text-black': 'hbt',
        'before:text-black': 'btb',
        'foo:bar:text-black': 'fbt',
        'content-before': 'cb',
      },
    }
    const { css } = await createProcessor({
      plugins: [plugin(options)],
    }).process(testData, {
      from: '',
      to: '',
    })
    assert.notInclude(css, '.hover\\:before\\:text-black:hover::before')
    assert.include(css, '.hbt:hover::before')
    assert.notInclude(css, '.before\\:text-black::before')
    assert.include(css, '.btb::before')
    assert.notInclude(css, '.foo\\:bar\\:text-black:foo::bar')
    assert.include(css, '.fbt:foo::bar')
    assert.notInclude(css, '.content-before::before')
    assert.include(css, '.cb::before')
  })

  it('Turn off the .empty-content class', async () => {
    const testData = `@tailwind utilities;`
    const options = {
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      emptyContent: false,
    }
    const { css } = await createProcessor({
      plugins: [plugin(options)],
    }).process(testData, {
      from: '',
      to: '',
    })

    assert.notInclude(css, '.before\\:empty-content::before')
  })

  it('Multiple Pseudo Classes', async () => {
    const testData = `@tailwind utilities;`
    const options = {
      multiplePseudoClasses: [':checked:hover'],
    }
    const { css } = await createProcessor({
      variants: {
        extend: {
          textColor: ['checked:hover', 'checked:hover::before'],
        },
      },
      plugins: [plugin(options)],
    }).process(testData, {
      from: '',
      to: '',
    })

    assert.include(css, '.checked\\:hover\\:text-black:checked:hover')
    assert.include(
      css,
      '.checked\\:hover\\:before\\:text-black:checked:hover::before'
    )
  })
})
