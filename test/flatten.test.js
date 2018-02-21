import {expect} from 'chai';
import {flatten} from '../src/testmap';

describe(`Testing 'flatten' function`, function () {
  const tests = {
    'a': {
      'a': 1,
      'b': 2,
    },
    'b': {
      'a': 3,
      'b': 4,
    },
  };

  it('Flattening 2 levels deep', function () {
    const flat = {
      'aa': 1,
      'ab': 4,
      'ba': 9,
      'bb': 16,
    };

    expect(flatten(tests, function (a, b) {
      return a + b;
    }, function (a, b, tests) {
      const val = tests[a][b];
      return val * val;
    })).to.eql(flat);
  });
});
