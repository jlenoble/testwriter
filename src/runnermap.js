export const descend = (descriptions, describe, it) => {
  Object.keys(descriptions).forEach(key => {
    const value = descriptions[key];

    if (typeof value === 'object') {
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

export default class RunnerMap {
  constructor (descriptions) {
    Object.defineProperty(this, 'descriptions', {
      value: descriptions,
      enumerable: true,
    });
  }
}
