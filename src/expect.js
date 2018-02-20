import {expect} from 'chai';
import StringArray from './stringarray';

export default function (...args) {
  return expect(new StringArray(args));
}
