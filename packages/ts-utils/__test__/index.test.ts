import * as utils from '../src/index';

describe('All utils are exported', () => {
  test('option utils are exported', () => {
    expect(utils).toHaveProperty('option');
    expect(utils.option).toHaveProperty('some');
    expect(utils.option).toHaveProperty('none');
    expect(utils.option).toHaveProperty('isSome');
    expect(utils.option).toHaveProperty('isNone');
    expect(utils.option).toHaveProperty('map');
    expect(utils.option).toHaveProperty('flatMap');
    expect(utils.option).toHaveProperty('getOrElse');
  });
});
