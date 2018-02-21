'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.addMethod('equiv', function () {
    new Assertion(this._obj).to.be.instanceof(_stringarray2.default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this.assert(this._obj.equals(args), 'expected #{this} to be equivalent to #{exp}', 'expected #{this} not to be equivalent to #{exp}', args);
  });
};

var _stringarray = require('./stringarray');

var _stringarray2 = _interopRequireDefault(_stringarray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-invalid-this */
;
module.exports = exports['default'];