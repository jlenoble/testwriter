'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var descend = exports.descend = function descend(descriptions, describe, it) {
  Object.keys(descriptions).forEach(function (key) {
    var value = descriptions[key];

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      describe(key, function () {
        descend(descriptions[key], describe, it);
      });
    } else {
      it(key, function () {
        value();
      });
    }
  });
};
var dive = exports.dive = function dive(obj, exec) {
  var arity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var keys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var root = arguments[4];

  root || (root = obj); // eslint-disable-line no-param-reassign

  if (!arity) {
    exec.apply(undefined, _toConsumableArray(keys).concat([root]));
  } else {
    Object.keys(obj).forEach(function (key) {
      dive(obj[key], exec, arity - 1, keys.concat(key), root);
    });
  };
};

var map = exports.map = function map(obj, exec) {
  var arity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var mappedObj = {};

  var func = function func() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var lastObj = mappedObj;
    var beforeLastObj = void 0;
    var lastKey = void 0;
    args.pop(); // Last elemenet is always obj

    args.forEach(function (key) {
      beforeLastObj = lastObj;
      lastKey = key;
      lastObj[key] = lastObj[key] || {};
      lastObj = lastObj[key];
    });

    beforeLastObj[lastKey] = exec.apply(undefined, args.concat([obj]));
  };

  dive(obj, func, arity);

  return mappedObj;
};

var flatten = exports.flatten = function flatten(obj, funcs) {
  var arity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var flatObj = {};

  var func = function func() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var lastObj = flatObj;
    var beforeLastObj = void 0;
    var lastKey = void 0;
    var beforeLastKey = void 0;

    funcs.forEach(function (fn) {
      beforeLastKey = lastKey;
      lastKey = typeof fn === 'function' ? fn.apply(undefined, args) : fn;

      if (typeof lastKey === 'string') {
        beforeLastObj = lastObj;
        lastObj[lastKey] = lastObj[lastKey] || {};
        lastObj = lastObj[lastKey];
      } else {
        beforeLastObj[beforeLastKey] = lastKey;
      }
    });
  };

  dive(obj, func, arity);

  return flatObj;
};