import {
  each,
  mapValues,
} from 'lodash';

const defaultOptions = {
  localName: 'local',
};

export default (props, { localName } = defaultOptions) => ({
  props,
  data() {
    return {
      [localName]: {
        ...mapValues(props, (prop, propName) => this[propName]),
      },
    };
  },
  created() {
    each(props, ({ deep = false }, propName) => {
      this.$watch(propName, (value) => {
        this[localName][propName] = value;
      }, { deep });
    });
  },
});
