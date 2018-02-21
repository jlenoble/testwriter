'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunnerMap = function () {
  function RunnerMap(descriptions) {
    _classCallCheck(this, RunnerMap);

    if (!(0, _utils.count)(descriptions)) {
      throw new Error('No descriptions provided for tests');
    }

    Object.defineProperty(this, 'descriptions', {
      value: descriptions,
      enumerable: true
    });
  }

  _createClass(RunnerMap, [{
    key: 'defineTests',
    value: function defineTests(describe, it) {
      (0, _utils.descend)(this.descriptions, describe, it);
    }
  }]);

  return RunnerMap;
}();

exports.default = RunnerMap;
module.exports = exports['default'];