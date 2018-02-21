export const dive = (obj, exec, arity = 2, keys = [], root) => {
  root || (root = obj); // eslint-disable-line no-param-reassign

  if (!arity) {
    exec(...keys, root);
  } else {
    Object.keys(obj).forEach(key => {
      dive(obj[key], exec, arity - 1, keys.concat(key), root);
    });
  };
};

export const map = (obj, exec, arity = 2) => {
  const mappedObj = {};

  const func = (...args) => {
    let lastObj = mappedObj;
    let beforeLastObj;
    let lastKey;
    args.pop(); // Last elemenet is always obj

    args.forEach(key => {
      beforeLastObj = lastObj;
      lastKey = key;
      lastObj[key] = lastObj[key] || {};
      lastObj = lastObj[key];
    });

    beforeLastObj[lastKey] = exec(...args, obj);
  };

  dive(obj, func, arity);

  return mappedObj;
};

export const flatten = (obj, funcs, arity = 2) => {
  const flatObj = {};

  const func = (...args) => {
    let lastObj = flatObj;
    let beforeLastObj;
    let lastKey;
    let beforeLastKey;

    funcs.forEach(fn => {
      beforeLastKey = lastKey;
      lastKey = typeof fn === 'function' ? fn(...args) : fn;

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

export default class TestMap {
  constructor (tests) {
    Object.defineProperty(this, 'tests', {
      value: tests,
      enumerable: true,
    });
  }

  describeTests (funcs, arity = 2) {
    return flatten(this.tests, funcs, arity);
  }
}
