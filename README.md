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
module.exports = {
  modules: [
    textColors: ['responsive', 'hover', 'focus', 'before', 'after'],
  ],
  
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
      variants: ['before', 'responsive']
    }),
    function ({ addUtilities }) {
      addUtilities(
        {
          '.empty-content': {
            content: "''"
          }
        },
        ['before']
      )
    }
  ]
}
```

### HTML

```html
<div class="relative before:aspect-ratio-4/3 before:empty-content">
  <img class="absolute pin w-full h-full" src="..." />
</div>
```
