/* eslint-disable no-invalid-this */
import StringArray from './stringarray';

export default function (chai, utils) {
  const Assertion = chai.Assertion;

  Assertion.addMethod('equiv', function (...args) {
    new Assertion(this._obj).to.be.instanceof(StringArray);

    this.assert(
      this._obj.equals(args),
      'expected #{this} to be equivalent to #{exp}',
      'expected #{this} not to be equivalent to #{exp}',
      args,
    );
  });
};
