const { assert } = require('chai')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

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
  it('@tailwind', async () => {
    const testData = `@tailwind utilities;`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.foo\\:bar\\:text-black:foo::bar')
  })

  it('@variants', async () => {
    const testData = `@variants foo_bar{.text-blue{color:blue}}`
    const { css } = await createProcessor().process(testData, {
      from: '',
      to: '',
    })
    assert.include(css, '.foo\\:bar\\:text-blue:foo::bar')
  })
})
