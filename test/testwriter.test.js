import chai from 'chai';
import TestWriter, {expect, plugin} from '../src/testwriter';

chai.use(plugin);

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

const writer = new TestWriter(tests);

writer.defineTests([
  'Testing class TestWriter',
  'Simple union operation',
  function (a, b, tests) {
    return `{${a}} U {${b}} = {${tests[a][b].split(',').sort().join(',')}}`;
  },
  function (a, b, tests) {
    return function () {
      expect(...new Set([a, b])).to.equiv(
        tests[a][b].split(','));
    };
  },
], 2, describe, it);
