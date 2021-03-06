'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  localName: 'local'
};

exports.default = function (props) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions,
      localName = _ref.localName;

  return {
    props: _extends({}, (0, _lodash.mapValues)(props, function (prop) {
      return (0, _lodash.omit)(prop, ['deep', 'format']);
    })),
    data: function data() {
      var _this = this;

      return _defineProperty({}, localName, _extends({}, (0, _lodash.mapValues)(props, function (_ref2, propName) {
        var _ref2$format = _ref2.format,
            format = _ref2$format === undefined ? _lodash.identity : _ref2$format;
        return format(_this[propName]);
      })));
    },
    created: function created() {
      var _this2 = this;

      (0, _lodash.each)(props, function (_ref4, propName) {
        var _ref4$format = _ref4.format,
            format = _ref4$format === undefined ? _lodash.identity : _ref4$format,
            _ref4$deep = _ref4.deep,
            deep = _ref4$deep === undefined ? false : _ref4$deep;

        _this2.$watch(propName, function (value) {
          _this2[localName][propName] = format(value);
        }, { deep: deep });
      });
    }
  };
};

module.exports = exports['default'];