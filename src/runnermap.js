import {descend} from './utils';

export default class RunnerMap {
  constructor (descriptions) {
    Object.defineProperty(this, 'descriptions', {
      value: descriptions,
      enumerable: true,
    });
  }

  defineTests (describe, it) {
    descend(this.descriptions, describe, it);
  }
}
