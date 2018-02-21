import {expect} from 'chai';
import {filter} from '../src/utils';

describe(`Testing 'filter' function`, function () {
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

  it('Filtering 2 levels deep', function () {
    const tests2 = {
      'a': {
        'a': false,
        'b': true,
      },
      'b': {
        'a': true,
        'b': false,
      },
    };

    expect(filter(tests, function (a, b, tests) {
      return tests2[a][b];
    })).to.eql({
      'a': {
        'b': 2,
      },
      'b': {
        'a': 3,
      },
    });
  });
});
