'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestMap = function () {
  function TestMap(tests) {
    _classCallCheck(this, TestMap);

    Object.defineProperty(this, 'tests', {
      value: tests,
      enumerable: true
    });
  }

  _createClass(TestMap, [{
    key: 'describeTests',
    value: function describeTests(funcs) {
      var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      return (0, _utils.flatten)(this.tests, funcs, arity);
    }
  }]);

  return TestMap;
}();

exports.default = TestMap;
module.exports = exports['default'];