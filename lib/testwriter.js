'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = exports.expect = exports.StringArray = exports.TestWriter = exports.TestMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _stringarray = require('./stringarray');

var _stringarray2 = _interopRequireDefault(_stringarray);

var _testmap = require('./testmap');

var _testmap2 = _interopRequireDefault(_testmap);

var _runnermap = require('./runnermap');

var _runnermap2 = _interopRequireDefault(_runnermap);

var _expect = require('./expect');

var _expect2 = _interopRequireDefault(_expect);

var _chaiStringarray = require('./chai-stringarray');

var _chaiStringarray2 = _interopRequireDefault(_chaiStringarray);

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
exports.TestMap = _testmap2.default;
exports.TestWriter = TestWriter;
exports.StringArray = _stringarray2.default;
exports.expect = _expect2.default;
exports.plugin = _chaiStringarray2.default;