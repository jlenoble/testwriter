import chai from 'chai';
import TestWriter, {expect, plugin} from '../src/index';

chai.use(plugin);

const tests = {
  'a': {
    'a': undefined,
    'b': undefined,
  },
  'b': {
    'a': undefined,
    'b': undefined,
  },
};

const writer = new TestWriter(tests);

writer.defineTests([
  'Testing class TestWriter',
  'All tests pending',
  function (a, b) {
    return `{${a}} U {${b}} = {${[...new Set([a, b])].sort().join(',')}}`;
  },
  function (a, b, tests) {
    return function () {
      expect(...new Set([a, b])).to.equiv(
        tests[a][b].split(','));
    };
  },
], 2, describe, it);
