import StringArray from './stringarray';
import TestMap from './testmap';
import RunnerMap from './runnermap';
import expect from './expect';
import plugin from './chai-stringarray';

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

export {TestMap, TestWriter, StringArray, expect, plugin};
export * from './utils';
