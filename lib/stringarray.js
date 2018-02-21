'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var merge = function merge(values, value) {
  if (typeof value === 'string') {
    return values.concat(value);
  }

  if (Array.isArray(value)) {
    return values.concat(value.reduce(merge, []));
  }

  if (value instanceof StringArray) {
    return merge(values, value.values);
  }

  throw new TypeError(value + ' can\'t be meaningfully converted to a string');
};

var StringArray = function () {
  function StringArray() {
    _classCallCheck(this, StringArray);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Object.defineProperty(this, 'values', {
      value: args.reduce(merge, []),
      enumerable: true
    });
  }

  _createClass(StringArray, [{
    key: 'equals',
    value: function equals() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var values = new StringArray(args).values;
      return this.values.length === values.length && this.values.every(function (value, i) {
        return value === values[i];
      });
    }
  }]);

  return StringArray;
}();

exports.default = StringArray;
module.exports = exports['default'];