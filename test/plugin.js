const { assert } = require('chai')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const processor = postcss([tailwindcss('./test/tailwind.config.js')])

describe('Testing...', () => {
  it('@tailwind', async () => {
    const testData = `@tailwind utilities;`
    const { css } = await processor.process(testData, { from: '', to: '' })
    assert.include(css, '.before\\:text-black::before')
  })

  it('@variants', async () => {
    const testData = `@variants after,before{.text-blue{color:blue}}`
    const { css } = await processor.process(testData, { from: '', to: '' })
    assert.include(css, '.after\\:text-blue::after')
    assert.include(css, '.before\\:text-blue::before')
  })
})
