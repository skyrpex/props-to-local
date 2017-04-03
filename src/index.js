import {
  each,
  identity,
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
        ...mapValues(props, ({ format = identity }, propName) => format(this[propName])),
      },
    };
  },
  created() {
    each(props, ({ format = identity, deep = false }, propName) => {
      this.$watch(propName, (value) => {
        this[localName][propName] = format(value);
      }, { deep });
    });
  },
});
