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
    let lastObj = mappedObj;
    let beforeLastObj;
    let lastKey;
    args.pop(); // Last element is always obj

    args.forEach(key => {
      beforeLastObj = lastObj;
      lastKey = key;
      lastObj[key] = lastObj[key] !== undefined
        ? lastObj[key]
        : {};
      lastObj = lastObj[key];
    });

    beforeLastObj[lastKey] = exec(...args, obj);
  };

  dive(obj, func, arity);

  return mappedObj;
};

export const filter = (obj, test, arity = 2) => {
  const filteredObj = {};

  const func = (...args) => {
    let lastObj = obj;
    let lastFilteredObj = filteredObj;
    let beforeLastFilteredObj;
    let lastKey;
    args.pop(); // Last element is always obj

    args.forEach(key => {
      beforeLastFilteredObj = lastFilteredObj;
      lastKey = key;
      lastFilteredObj[key] = lastFilteredObj[key] !== undefined
        ? lastFilteredObj[key]
        : {};
      lastFilteredObj = lastFilteredObj[key];
      lastObj = lastObj[key];
    });

    if (test(...args, obj)) {
      beforeLastFilteredObj[lastKey] = lastObj;
    } else {
      delete beforeLastFilteredObj[lastKey];
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
