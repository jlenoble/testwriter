import {expect} from 'chai';
import {dive} from '../src/testmap';

const tests = {
  'a': {
    'a': 'a',
    'b': 'a,b',
  },
  'b': {
    'a': 'b,a',
    'b': 'b',
  },
};

describe(`Testing 'dive' function`, function () {
  it('Diving 2 levels deep', function () {
    const keys = [];

    dive(tests, function (a, b, tests) {
      keys.push(tests[a][b]);
    });

    expect(keys).to.eql(['a', 'a,b', 'b,a', 'b']);
  });

  it('Diving 1 level deep', function () {
    const keys = [];

    dive(tests, function (a, tests) {
      keys.push(Object.keys(tests[a]));
    }, 1);

    expect(keys).to.eql([['a', 'b'], ['a', 'b']]);
  });
});
