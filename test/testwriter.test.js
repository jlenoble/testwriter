import Muter, {captured} from 'muter';
import {expect} from 'chai';
import Testwriter from '../src/testwriter';

describe('Testing Testwriter', function () {
  const muter = Muter(console, 'log'); // eslint-disable-line new-cap

  it(`Class Testwriter says 'Hello world!'`, captured(muter, function () {
    new Testwriter();
    expect(muter.getLogs()).to.equal('Hello world!\n');
  }));
});
