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
const plugin = require("tailwindcss/plugin");

module.exports = {
  variants: {
    textColor: [
      "responsive",
      "hover",
      "focus",
      "before",
      "after",
      "hover_before",
      "hover_after",
      "focus_before",
    ],
  },

  plugins: [
    require("tailwindcss-pseudo-elements"),
    // This plugin is useful in combination with tailwindcss-aspect-ratio.
    require("tailwindcss-aspect-ratio")({
      ratios: {
        "16/9": [16, 9],
        "4/3": [4, 3],
        "3/2": [3, 2],
        "1/1": [1, 1],
      },
      variants: ["before", "hover_before", "responsive"],
    }),
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".empty-content": {
            content: "''",
          },
        },
        ["before"]
      );
    }),
  ],
};
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
