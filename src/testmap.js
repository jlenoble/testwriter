import {flatten} from './utils';

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
