'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _testmap = require('./testmap');

var _testmap2 = _interopRequireDefault(_testmap);

var _runnermap = require('./runnermap');

var _runnermap2 = _interopRequireDefault(_runnermap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestWriter = function () {
  function TestWriter(tests) {
    _classCallCheck(this, TestWriter);

    Object.defineProperty(this, 'tests', {
      value: new _testmap2.default(tests),
      enumerable: true
    });
  }

  _createClass(TestWriter, [{
    key: 'defineTests',
    value: function defineTests(funcs) {
      var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var describe = arguments[2];
      var it = arguments[3];

      var descriptions = this.tests.describeTests(funcs, arity);
      var runnerMap = new _runnermap2.default(descriptions);
      runnerMap.defineTests(describe, it);
    }
  }]);

  return TestWriter;
}();

exports.default = TestWriter;
module.exports = exports['default'];