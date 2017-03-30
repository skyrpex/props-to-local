var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { each, mapValues } from 'lodash';

var defaultOptions = {
  localName: 'local'
};

export default (function (props) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  return {
    props: props,
    data: function data() {
      var _this = this;

      return _defineProperty({}, options.localName, _extends({}, mapValues(props, function (prop, propName) {
        return _this[propName];
      })));
    },
    created: function created() {
      var _this2 = this;

      each(props, function (prop, propName) {
        _this2.$watch(propName, function (value) {
          _this2[options.localName][propName] = value;
        });
      });
    }
  };
});
