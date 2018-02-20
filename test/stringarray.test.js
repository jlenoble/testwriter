import {expect} from 'chai';
import StringArray from '../src/stringarray';

describe('Testing class StringArray', function () {
  it('Can be initialized with nothing', function () {
    expect(() => new StringArray()).not.to.throw();
    expect(new StringArray().values).to.eql([]);
  });

  it('Can be initialized with a string', function () {
    expect(() => new StringArray('foo')).not.to.throw();
    expect(new StringArray('foo').values).to.eql(['foo']);
  });

  it('Can be initialized with strings', function () {
    expect(() => new StringArray('foo', 'bar', 'baz')).not.to.throw();
    expect(new StringArray('foo', 'bar', 'baz').values).to.eql([
      'foo', 'bar', 'baz']);
  });

  it('Can be initialized with an array of strings', function () {
    expect(() => new StringArray(['foo', 'bar', 'baz'])).not.to.throw();
    expect(new StringArray(['foo', 'bar', 'baz']).values).to.eql([
      'foo', 'bar', 'baz']);
  });

  it('Can be initialized with another StringArray', function () {
    expect(() => new StringArray(new StringArray('foo'))).not.to.throw();
    expect(new StringArray(new StringArray('foo')).values).to.eql(['foo']);
  });

  it('Can be initialized with arrays of strings', function () {
    expect(() => new StringArray(['foo'], ['bar', 'baz'])).not.to.throw();
    expect(new StringArray(['foo'], ['bar', 'baz']).values).to.eql([
      'foo', 'bar', 'baz']);
  });

  it('Can be initialized with mixed valid args', function () {
    expect(() => new StringArray(
      ['foo'],
      ['bar', 'baz'],
      'quux',
      new StringArray('foobaz'),
      new StringArray('foo', ['bar', 'baz'], new StringArray('barbaz'))
    )).not.to.throw();
    expect(new StringArray(
      ['foo'],
      ['bar', 'baz'],
      'quux',
      new StringArray('foobaz'),
      new StringArray('foo', ['bar', 'baz'], new StringArray('barbaz'))
    ).values).to.eql(['foo', 'bar', 'baz', 'quux', 'foobaz', 'foo', 'bar',
      'baz', 'barbaz']);
  });

  it('Can be compared with empty arg (pseudo-isEmpty method)', function () {
    expect(new StringArray().equals()).to.be.true;
    expect(new StringArray('foo').equals()).to.be.false;
  });

  it('Can be compared with a string', function () {
    expect(new StringArray('foo').equals('foo')).to.be.true;
    expect(new StringArray('foo').equals('bar')).to.be.false;
  });

  it('Can be compared with strings', function () {
    expect(new StringArray('foo', 'bar').equals('foo', 'bar')).to.be.true;
    expect(new StringArray('foo', 'bar').equals('bar', 'foo')).to.be.false;
  });

  it('Can be compared with an array of strings', function () {
    expect(new StringArray('foo', 'bar').equals(['foo', 'bar'])).to.be.true;
    expect(new StringArray('foo', 'bar').equals(['bar', 'foo'])).to.be.false;
  });

  it('Can be compared with another StringArray', function () {
    expect(new StringArray('foo').equals(new StringArray('foo'))).to.be.true;
    expect(new StringArray('foo').equals(new StringArray('bar'))).to.be.false;
  });

  it('Can be compared with arrays of strings', function () {
    expect(new StringArray('foo', 'bar').equals(['foo'], ['bar'])).to.be.true;
    expect(new StringArray('foo', 'bar').equals(['bar'], ['foo'])).to.be.false;
  });

  it('Can be compared with mixed valid args', function () {
    expect(new StringArray(
      ['foo'],
      ['bar', 'baz'],
      'quux',
      new StringArray('foobaz'),
      new StringArray('foo', ['bar', 'baz'], new StringArray('barbaz'))
    ).equals([ // Wrap everything in []
      ['foo'],
      'bar', 'baz', // Removed []
      ['quux'], // Added []
      new StringArray(new StringArray('foobaz')), // Wrapped with StringArray
      new StringArray('foo', 'bar', 'baz', 'barbaz'), // Flattened all
    ])).to.be.true;
    expect(new StringArray(
      ['foo'],
      ['bar', 'baz'],
      'quux',
      new StringArray('foobaz'),
      new StringArray('foo', ['bar', 'baz'], new StringArray('barbaz'))
    ).equals(
      ['foo'],
      ['bar', 'baz'],
      'quus', // Added on mistake
      new StringArray('foobaz'),
      new StringArray('foo', ['bar', 'baz'], new StringArray('barbaz'))
    )).to.be.false;
  });
});
