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

  plugins: [
    require('tailwindcss-pseudo-elements')({
      // You can set up your own pseudo-classes and pseudo-elements. (type: string[]  default: [])
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      // Configuration of the Content Property Utilities (type: boolean | { prefix: string }  default: { prefix: "tw-content" })
      contentUtilities: false,
      // Whether to generate utility class for empty content pseudo-element (type: boolean  default: true)
      emptyContent: false,
      // You can replace frequently used class names with different names (type: Record<string, string>, default: {})
      classNameReplacer: {
        'hover:before:text-black': 'hbt',
      },
    }),
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
