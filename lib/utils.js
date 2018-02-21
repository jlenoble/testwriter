'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var get = exports.get = function get(obj, keys) {
  return keys.reduce(function (val, key) {
    return val[key];
  }, obj);
};

var set = exports.set = function set(obj, keys, value) {
  var l = keys.length - 1;
  keys.reduce(function (obj, key, i) {
    if (obj[key] === undefined) {
      obj[key] = i === l ? value : {}; // eslint-disable-line no-param-reassign
    }
    return obj[key];
  }, obj);
};

var count = exports.count = function count(obj) {
  var counter = 0;
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      counter += count(value);
    } else {
      ++counter;
    }
  });
  return counter;
};

var descend = exports.descend = function descend(descriptions, describe, it) {
  Object.keys(descriptions).forEach(function (key) {
    var value = descriptions[key];

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      describe(key, function () {
        descend(value, describe, it);
      });
    } else {
      it(key, value);
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

    var keys = args.slice(0, args.length - 1);
    set(mappedObj, keys, exec.apply(undefined, args));
  };

  dive(obj, func, arity);

  return mappedObj;
};

var filter = exports.filter = function filter(obj, test) {
  var arity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var filteredObj = {};

  var func = function func() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var keys = args.slice(0, args.length - 1);
    if (test.apply(undefined, args)) {
      set(filteredObj, keys, get(obj, keys));
    }
  };

  dive(obj, func, arity);

  return filteredObj;
};

var flatten = exports.flatten = function flatten(obj, funcs) {
  var arity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  var flatObj = {};

  var func = function func() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var keys = args.slice(0, args.length - 1);
    var value = get(obj, keys);

    if (value !== undefined) {
      var keys2 = funcs.map(function (func) {
        return typeof func === 'function' ? func.apply(undefined, args) : func;
      });
      var _value = keys2.pop();
      set(flatObj, keys2, _value);
    } else {
      var _keys = funcs.slice(0, funcs.length - 1).map(function (func) {
        return typeof func === 'function' ? func.apply(undefined, args) : func;
      });
      set(flatObj, _keys, undefined);
    }
  };

  dive(obj, func, arity);

  return flatObj;
};