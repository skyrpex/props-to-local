import Vue from 'vue';
import test from 'ava';
import { has, startCase } from 'lodash';
import propsToLocal from './src';

// const nextTick = () => new Promise((resolve) => {
//   Vue.nextTick(() => {
//     resolve();
//   });
// });

test('defines props correctly', (t) => {
  const mixin = propsToLocal({
    booleanTest: {
      type: Boolean,
      default: true,
    },
  });

  t.deepEqual(mixin.props, {
    booleanTest: {
      type: Boolean,
      default: true,
    },
  });
});

test('excludes "deep" attribute from props', (t) => {
  const mixin = propsToLocal({
    deepTest: {
      type: Boolean,
      deep: true,
    },
  });

  t.deepEqual(mixin.props, {
    deepTest: {
      type: Boolean,
    },
  });
});

test('excludes "format" attribute from props', (t) => {
  const mixin = propsToLocal({
    deepTest: {
      type: Boolean,
      format: value => value,
    },
  });

  t.deepEqual(mixin.props, {
    deepTest: {
      type: Boolean,
    },
  });
});

test('defines local object correctly', (t) => {
  const component = new Vue(propsToLocal({}, {
    localName: 'myLocalData',
  }));

  t.true(has(component.$data, ['myLocalData']), 'Specified local data does not exist.');
});

test('uses "local" name for local object by default', (t) => {
  const component = new Vue(propsToLocal({}));

  t.true(has(component.$data, ['local']), 'Local data does not exist.');
});

test('formats local data during initialization', (t) => {
  const component = new Vue(propsToLocal({
    testValue: {
      default: 'my value',
      format: value => startCase(value),
    },
  }));

  t.is(component.$data.local.testValue, 'My Value');
});

test.todo('updates local data on prop change');

test.todo('formats local data on prop change');

test.todo('watches props deeply');
