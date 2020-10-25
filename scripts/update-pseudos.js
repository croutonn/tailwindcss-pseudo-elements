const fs = require('fs')
const path = require('path')

const puppeteer = require('puppeteer')

const DOCUMENT_URL = {
  classes: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes',
  elements: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements',
}
const CODES_SELECTOR = '#index>ul>li>a>code'

/**
 * @typedef {import("puppeteer").Browser} Browser
 */

/**
 * @param {Browser} browser
 * @returns {Promise<string[]>}
 */
const getPseudos = async (browser, url, selector = CODES_SELECTOR) => {
  const page = await browser.newPage()
  await page.goto(url)
  const codeElements = await page.$$(selector)
  const codes = await Promise.all(
    codeElements.map((element) =>
      element.evaluate((node) =>
        node.innerText.split(/\s/)[0].replace(/^:+/, '')
      )
    )
  )

  return codes.filter((code) => code.indexOf('(') === -1)
}

;(async () => {
  const browser = await puppeteer.launch()
  const [classes, elements] = await Promise.all([
    getPseudos(browser, DOCUMENT_URL.classes),
    getPseudos(browser, DOCUMENT_URL.elements),
  ])
  await browser.close()

  const output = `/* DON'T EDIT THIS FILE. This is generated by 'scripts/update-pseudos.js' */
module.exports = {
  pseudoElements: [
${elements.map((e) => `    '${e}'`).join(',\n')},
  ],

  pseudoClasses: [
${classes.map((c) => `    '${c}'`).join(',\n')},
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
`

  fs.writeFileSync(path.resolve(__dirname, '../lib.js'), output, 'utf-8')
})()
