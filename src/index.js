import {
  each,
  mapValues,
} from 'lodash';

const defaultOptions = {
  localName: 'local',
};

export default (props, options = defaultOptions) => ({
  props,
  data() {
    return {
      [options.localName]: {
        ...mapValues(props, (prop, propName) => this[propName]),
      },
    };
  },
  created() {
    each(props, ({ deep = false }, propName) => {
      this.$watch(propName, (value) => {
        this[options.localName][propName] = value;
      }, { deep });
    });
  },
});
