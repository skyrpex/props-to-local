# Props To Local

[![CircleCI](https://circleci.com/gh/skyrpex/props-to-local.svg?style=svg)](https://circleci.com/gh/skyrpex/props-to-local) [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/rt8hjn1mt24qrovl?svg=true)](https://ci.appveyor.com/project/skyrpex/props-to-local) [![TravisCI Build status](https://travis-ci.org/skyrpex/props-to-local.svg?branch=master)](https://travis-ci.org/skyrpex/props-to-local)

> Works with:
>
> <a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/vue-%5E2.0-green.svg" alt="Vue 2"></a>

This mixin will sync down properties to local data. This allows defining a property that can be changed within the component (using v-model, for example).

A case of use is creating a checkbox component that that can be correctly toggled without passing down a value through a prop.

## Installation

`npm install @skyrpex/props-to-local`

## Usage

```html
<template>
  <input type="checkbox" v-model="local.value" @change="$emit('input', $event.target.checked)">
</template>

<script>
import propsToLocal '@skyrpex/props-to-local';

// In this example, a 'value' prop is given to propsToLocal.
export default {
  mixins: [
    propsToLocal({
      // Normal props here
      value: {
        type: Boolean,
        default: false,
      },
    }),
  ],
};
</script>
```

The above example will generate the following component:

```js
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      local: {
        // Will default to false, as stated above.
        value: this.value,
      },
    };
  },
};
```

## Options

```html
<script>
import { identity } from 'lodash';
import propsToLocal '@skyrpex/props-to-local';

export default {
  mixins: [
    propsToLocal({
      value: {
        type: Boolean,
        default: false,
        // Watch prop changes deeply (defaults to false).
        deep: false,
        // Format props before overwriting local values (defaults to Lodash.Identity).
        format: identity,
      },
    }),
  ],
};
</script>
```
