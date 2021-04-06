# tailwindcss-pseudo-elements <!-- omit in toc -->

TailwindCSS Plug-in that adds variants of pseudo elements (`::before`, `::after`, `::first-letter`, etc.).

---

- [Getting Started](#getting-started)
  - [Install](#install)
    - [NPM](#npm)
    - [Yarn](#yarn)
  - [Write the configuration for the plug-in](#write-the-configuration-for-the-plug-in)
  - [Set the variants](#set-the-variants)
  - [Write the HTML](#write-the-html)
    - [Content Property Utilities](#content-property-utilities)
    - [Empty Property Utility](#empty-property-utility)
- [Options](#options)
  - [`customPseudoClasses` and `customPseudoElements`](#custompseudoclasses-and-custompseudoelements)
  - [`contentUtilities`](#contentutilities)
  - [`emptyContent`](#emptycontent)
  - [`classNameReplacer`](#classnamereplacer)
- [Recommended](#recommended)
  - [tailwindcss-aspect-ratio](#tailwindcss-aspect-ratio)

---

## Getting Started

### Install

#### NPM

```sh
npm install tailwindcss-pseudo-elements --save-dev
```

#### Yarn

```sh
yarn add tailwindcss-pseudo-elements -D
```

### Write the configuration for the plug-in

Pass [the option](#options) object to the plug-in as follows:

```js
module.exports = {
  plugins: [
    require('tailwindcss-pseudo-elements')({
      customPseudoClasses: ['foo'],
      customPseudoElements: ['bar'],
      contentUtilities: false,
      emptyContent: false,
      classNameReplacer: {
        'hover:before:text-black': 'hbt',
      },
    }),
  ],
}
```

### Set the variants

Naming convention of the variants is like `pseudo-class:pseudo-class::pseudo-element`.  
An example configuration is shown below.

```js
module.exports = {
  variants: {
    extend: {
      textColor: [
        'responsive',
        'hover',
        'focus',
        'before',
        'after',
        'hover::before',
        'hover::after',
        'focus::before',
        'checked:hover',
        'checked:hover::before',
      ],
    },
  },
}
```

### Write the HTML

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
  class="content-before content-after content-hover-before"
  tw-content-before="🧡"
  tw-content-hover-before="💖"
  tw-content-after="💙️"
>
  Tailwind CSS
</p>
```

#### Empty Property Utility

There is a utility class that sets `{ content: "" }` in the `::before`.

```html
<p class="before:empty-content"></p>
```

## Options

### `customPseudoClasses` and `customPseudoElements`

You can set up your own pseudo-classes and pseudo-elements.

type: `string[]`  
default: `[]`

### `contentUtilities`

Configuration of [the Content Property Utilities](#content-property-utilities).

type: `boolean | { "prefix": string }`  
default: `{ "prefix": "tw-content" }`

### `emptyContent`

Whether to generate [the Empty Property Utility](#empty-property-utility).

type: `boolean`
default: `true`

### `classNameReplacer`

You can replace frequently used class names with different names.

type: `Record<string, string>`  
default: `{}`

## Recommended

### tailwindcss-aspect-ratio

```js
  plugins: [
    require('tailwindcss-pseudo-elements')(pseudoOptions),
    require('tailwindcss-aspect-ratio')({
      ratios: {
        '16/9': [16, 9],
        '4/3': [4, 3],
        '3/2': [3, 2],
        '1/1': [1, 1],
      },
      variants: ['before', 'hover::before', 'responsive'],
    }),
  ],
}
```
