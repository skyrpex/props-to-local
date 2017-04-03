import {
  each,
  omit,
  identity,
  mapValues,
} from 'lodash';

const defaultOptions = {
  localName: 'local',
};

export default (props, { localName } = defaultOptions) => ({
  props: {
    ...mapValues(props, prop => omit(prop, ['deep', 'format'])),
  },
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
