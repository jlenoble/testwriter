'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _chai.expect)(new _stringarray2.default(args));
};

var _chai = require('chai');

var _stringarray = require('./stringarray');

var _stringarray2 = _interopRequireDefault(_stringarray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];