const merge = (values, value) => {
  if (typeof value === 'string') {
    return values.concat(value);
  }

  if (Array.isArray(value)) {
    return values.concat(value.reduce(merge, []));
  }

  if (value instanceof StringArray) {
    return merge(values, value.values);
  }

  throw new TypeError(`${value} can't be meaningfully converted to a string`);
};

export default class StringArray {
  constructor (...args) {
    Object.defineProperty(this, 'values', {
      value: args.reduce(merge, []),
      enumerable: true,
    });
  }

  equals (...args) {
    const values = new StringArray(args).values;
    return this.values.length === values.length &&
      this.values.every((value, i) => {
        return value === values[i];
      });
  }
}
