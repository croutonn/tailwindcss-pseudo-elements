const { assert } = require('chai')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const plugin = require('..')

const baseConfig = require('./tailwind.config')

const createProcessor = (config = {}) => {
  return postcss([tailwindcss({ ...baseConfig, ...config })])
}

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
    const testData = `@variants hover_after,hover_before{.text-blue{color:blue}}`
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
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      classNameReplacer: {
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

    assert.notInclude(css, '.before\\:text-black::before')
    assert.include(css, '.btb::before')
    assert.notInclude(css, '.foo\\:bar\\:text-black:foo::bar')
    assert.include(css, '.fbt:foo::bar')
    assert.notInclude(css, '.content-before::before')
    assert.include(css, '.cb::before')
  })
})
