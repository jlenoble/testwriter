import {expect} from 'chai';
import {map} from '../src/testmap';

describe(`Testing 'map' function`, function () {
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

  it('Mapping 2 levels deep', function () {
    const tests2 = {
      'a': {
        'a': 4,
        'b': 8,
      },
      'b': {
        'a': 12,
        'b': 16,
      },
    };

    expect(map(tests, function (a, b, tests) {
      return tests[a][b] * 4;
    })).to.eql(tests2);
  });

  it('Mapping 1 level deep', function () {
    const tests2 = {
      'a': 'ab',
      'b': 'ab',
    };

    expect(map(tests, function (a, tests) {
      return Object.keys(tests[a]).join('');
    }, 1)).to.eql(tests2);
  });
});
