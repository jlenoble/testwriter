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

export default class TestMap {
  constructor (tests) {
    Object.defineProperty(this, 'tests', {
      value: tests,
      enumerable: true,
    });
  }
}
