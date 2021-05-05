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
  test('result utils are exported', () => {
    expect(utils).toHaveProperty('result');
    expect(utils.result).toHaveProperty('ok');
    expect(utils.result).toHaveProperty('error');
    expect(utils.result).toHaveProperty('isOk');
    expect(utils.result).toHaveProperty('isError');
    expect(utils.result).toHaveProperty('mapOk');
    expect(utils.result).toHaveProperty('mapError');
    expect(utils.result).toHaveProperty('flatMapOk');
    expect(utils.result).toHaveProperty('flatMapError');
    expect(utils.result).toHaveProperty('getOk');
    expect(utils.result).toHaveProperty('getError');
    expect(utils.result).toHaveProperty('getOkOrElse');
    expect(utils.result).toHaveProperty('getErrorOrElse');
  });
});
