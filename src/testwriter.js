import expect from './expect';

function getDescriptions (describe) {
  switch (typeof describe) {
  case 'function':
    return getDescriptions(describe());

  case 'string':
    return [describe];

  case 'object':
    if (Array.isArray(describe)) {
      return describe.map(el => el.toString());
    }

  default:
    return [];
  }
}

export default class TestWriter {
  constructor (tests, options = {
    describe () {
      return 'No title defined';
    },
  }) {
    const describes = getDescriptions(options.describe);
    const auto = options.auto;

    if (auto) { // Enter autotest mode
      return new AutoTest({describes}, auto);
    } // return: Never define actual tests in autotest mode

    describes.forEach(description => {
      describe(description, function () {
        it('bobo');
      });
    });
  }
}

class AutoTest {
  constructor ({describes}, auto = {}) {
    if (auto.describe) {
      describe('Autotesting descriptions', function () {
        it(`'describe' titles are as expected`, function () {
          expect(describes).to.equiv(auto.describe);
        });
      });
    }
  }
}
