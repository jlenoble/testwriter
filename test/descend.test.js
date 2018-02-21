import {expect} from 'chai';
import {dive, descend} from '../src/utils';

let counter = 0;

const test = (a, b, descriptions) => function () {
  expect(descriptions[a]).to.have.property(b);
  --counter;
};

const descriptions = {
  'Testing class A': {
    'with method a': test,
    'with method b': test,
  },
  'Testing class B': {
    'with method a': test,
    'with method b': test,
  },
};

dive(descriptions, function (a, b) {
  ++counter;
  descriptions[a][b] = descriptions[a][b](a, b, descriptions);
});

describe(`Testing 'descend' function`, function () {
  before(function () {
    // Sanity check: test callbacks have been set
    expect(counter).to.be.above(0);
  });

  descend(descriptions, describe, it);

  after(function () {
    // Sanity check: all test callbacks have run
    expect(counter).to.equal(0);
  });
});
