import TestMap from './testmap';
import RunnerMap from './runnermap';

export default class TestWriter {
  constructor (tests) {
    Object.defineProperty(this, 'tests', {
      value: new TestMap(tests),
      enumerable: true,
    });
  }

  defineTests (funcs, arity = 2, describe, it) {
    const descriptions = this.tests.describeTests(funcs, arity);
    const runnerMap = new RunnerMap(descriptions);
    runnerMap.defineTests(describe, it);
  }
}
