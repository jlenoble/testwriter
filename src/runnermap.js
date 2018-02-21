import {descend, count} from './utils';

export default class RunnerMap {
  constructor (descriptions) {
    if (!count(descriptions)) {
      throw new Error('No descriptions provided for tests');
    }

    Object.defineProperty(this, 'descriptions', {
      value: descriptions,
      enumerable: true,
    });
  }

  defineTests (describe, it) {
    descend(this.descriptions, describe, it);
  }
}
