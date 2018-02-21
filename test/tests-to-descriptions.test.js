import {expect} from 'chai';
import TestMap from '../src/testmap';
import RunnerMap from '../src/runnermap';

describe('Generating descriptions from tests, then running', function () {
  const testMap = new TestMap({
    'a': {
      'a': 'a',
      'b': 'a,b',
    },
    'b': {
      'a': 'b,a',
      'b': 'b',
    },
  });

  class A {
    constructor (a) {
      this.a = a;
    }

    add (b) {
      return new A(testMap.tests[this.a][b.a || b]);
    }
  }

  let counter = 0;

  const descriptions = testMap.describeTests([
    'Testing addition',
    function (a, b, tests) {
      ++counter;
      return a + '+' + b + '==' + tests[a][b];
    },
    function (a, b, tests) {
      return function () {
        --counter;
        expect(new A(a).add(new A(b)).a).to.equal(tests[a][b]);
      };
    },
  ]);

  const runnerMap = new RunnerMap(descriptions);

  before(function () {
    // Sanity check: all test callbacks have been set
    expect(counter).to.be.above(0);
  });

  runnerMap.defineTests(describe, it);

  after(function () {
    // Sanity check: all test callbacks have run
    expect(counter).to.equal(0);
  });
});
