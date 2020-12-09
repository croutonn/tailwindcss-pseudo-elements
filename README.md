# tailwindcss-pseudo-elements

TailwindCSS Plugin that adds variants of pseudo elements (`::before`, `::after`, `::first-letter`, etc.).

## Usage

### Install

#### NPM

```sh
npm install tailwindcss-pseudo-elements --save-dev
```

#### Yarn

```sh
yarn add tailwindcss-pseudo-elements -D
```

### Configuration

```js
const plugin = require('tailwindcss/plugin')

module.exports = {
  variants: {
    extend: {
      textColor: [
        'responsive',
        'hover',
        'focus',
        'before',
        'after',
        // If you want to combine it with a pseudo class,
        // use `<pseudo-class>_<pseudo-element>`.
        'hover_before',
        'hover_after',
        'focus_before',
        'foo_bar',
      ],
    },
  },

  // You can set up your own pseudo-classes and pseudo-elements.
  customPseudoClasses: ['foo'],
  customPseudoElements: ['bar'],

  plugins: [
    require('tailwindcss-pseudo-elements'),
    // This plugin is useful in combination with tailwindcss-aspect-ratio.
    require('tailwindcss-aspect-ratio')({
      ratios: {
        '16/9': [16, 9],
        '4/3': [4, 3],
        '3/2': [3, 2],
        '1/1': [1, 1],
      },
      variants: ['before', 'hover_before', 'responsive'],
    }),
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          '.empty-content': {
            content: "''",
          },
        },
        ['before']
      )
    }),
  ],
}
```

### HTML

```html
<div
  class="relative
    before:aspect-ratio-4/3
    hover:before:aspect-ratio-1/1
    before:empty-content"
>
  <img class="absolute pin w-full h-full" src="..." />
</div>
```

#### Content Property Utilities

There are utilities that set the attributes of HTML elements to the content property.

Mark it up as follows:

```html
<p
  class="text-lg text-blue-600 content-before content-after content-hover-before"
  tw-content-before="🧡"
  tw-content-hover-before="💖"
  tw-content-after="💙️"
>
  Tailwind CSS
</p>
```
