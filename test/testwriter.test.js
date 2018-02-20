import chai from 'chai';
import plugin from '../src/chai-stringarray';
import TestWriter from '../src/testwriter';

chai.use(plugin);

const factory = function (key) {
  return key;
};

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

const describeTitle = 'Testing a set algebra';
const itTitles = [
  'a+a=a',
  'a+b=a,b',
  'b+a=b,a',
  'b+b=b',
];

const options = {
  describe () {
    return describeTitle;
  },
};

const auto = {
  describe: [describeTitle],
  it: itTitles,
};

// First ensure consistency of test tools
new TestWriter(tests, Object.assign({auto}, options));

// Now use tools with same options
new TestWriter(tests, options);
