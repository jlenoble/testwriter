import chai, {expect} from 'chai';
import plugin from '../src/chai-stringarray';
import TestWriter from '../src/testwriter';
import StringArray from '../src/stringarray';

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
      expect(new StringArray(...new Set([a, b]))).to.equiv(
        tests[a][b].split(','));
    };
  },
], 2, describe, it);
