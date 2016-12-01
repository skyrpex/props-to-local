# Props To Local

This mixins will sync down properties to local data. This allows defining a property that can be changed within the component (using v-model, for example).

A case of use is creating a checkbox component that doesn't required to pass down a value.

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
