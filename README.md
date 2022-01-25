
# components

angular components based on @angular/material

[![License](https://img.shields.io/github/license/fokklz/components?style=for-the-badge)](/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@fokklzdev/components?style=for-the-badge)](https://www.npmjs.com/package/@fokklzdev/components)
[![Issues](https://img.shields.io/github/issues/fokklz/components?style=for-the-badge)](https://github.com/fokklz/components/issues)


[![GitHub forks](https://img.shields.io/github/forks/fokklz/components.svg?style=social&label=Fork)](https://github.com/fokklz/components/fork)
[![GitHub stars](https://img.shields.io/github/stars/fokklz/components.svg?style=social&label=Star)](https://github.com/fokklz/components)

# Table of Contents

- [Installation](#installation)
- [Styling](#styling)

# Installation

```
npm i @fokklzdev/components
```

# Styling

updating ur styles to contain the component styles this function will generate all CSS for this library based on the passed vars.

`src/app/style.scss`
```scss
@use '@fokklzdev/components' as flz
@include flz.theme()
```

as-is the theme is default dark and has a light alternative if u decide to change this u can use `with`

`src/app/style.scss`
```scss
@use '@fokklzdev/components' as flz with (
  $default-theme: 'light'
)
@include flz.theme()
```
