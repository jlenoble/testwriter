export const get = (obj, keys) => {
  return keys.reduce((val, key) => {
    return val[key];
  }, obj);
};

export const set = (obj, keys, value) => {
  const l = keys.length - 1;
  keys.reduce((obj, key, i) => {
    if (obj[key] === undefined) {
      obj[key] = i === l ? value : {}; // eslint-disable-line no-param-reassign
    }
    return obj[key];
  }, obj);
};

export const descend = (descriptions, describe, it) => {
  Object.keys(descriptions).forEach(key => {
    const value = descriptions[key];

    if (typeof value === 'object') {
      describe(key, function () {
        descend(value, describe, it);
      });
    } else {
      it(key, value);
    }
  });
};
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
    const keys = args.slice(0, args.length -1);
    set(mappedObj, keys, exec(...args));
  };

  dive(obj, func, arity);

  return mappedObj;
};

export const filter = (obj, test, arity = 2) => {
  const filteredObj = {};

  const func = (...args) => {
    const keys = args.slice(0, args.length -1);
    if (test(...args)) {
      set(filteredObj, keys, get(obj, keys));
    }
  };

  dive(obj, func, arity);

  return filteredObj;
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
        lastObj[lastKey] = lastObj[lastKey] !== undefined
          ? lastObj[lastKey]
          : {};
        lastObj = lastObj[lastKey];
      } else {
        beforeLastObj[beforeLastKey] = lastKey;
      }
    });
  };

  dive(obj, func, arity);

  return flatObj;
};
