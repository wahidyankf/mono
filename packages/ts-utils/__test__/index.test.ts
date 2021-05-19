import * as utils from '../src';

describe('All utils are exported', () => {
  test('adt utils are exported', () => {
    expect(utils).toHaveProperty('adt');
    expect(utils.adt).toHaveProperty('match');
    expect(utils.adt).toHaveProperty('unsafeMatchLast');
    expect(utils.adt).toHaveProperty('matchP');
    expect(utils.adt).toHaveProperty('unsafeMatchPLast');
  });
  test('attempt utils are exported', () => {
    expect(utils).toHaveProperty('attempt');
  });
  test('ensure utils are exported', () => {
    expect(utils).toHaveProperty('ensure');
    expect(utils.ensure).toHaveProperty('ensureString');
    expect(utils.ensure).toHaveProperty('ensureNumber');
    expect(utils.ensure).toHaveProperty('ensureObject');
    expect(utils.ensure).toHaveProperty('ensureArray');
    expect(utils.ensure).toHaveProperty('DEFAULT_STRING');
    expect(utils.ensure).toHaveProperty('DEFAULT_NUMBER');
    expect(utils.ensure).toHaveProperty('DEFAULT_OBJECT');
    expect(utils.ensure).toHaveProperty('DEFAULT_ARRAY');
  });
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
  test('pipe utils are exported', () => {
    expect(utils).toHaveProperty('pipe');
  });
  test('result utils are exported', () => {
    expect(utils).toHaveProperty('result');
    expect(utils.result).toHaveProperty('ok');
    expect(utils.result).toHaveProperty('error');
    expect(utils.result).toHaveProperty('isOk');
    expect(utils.result).toHaveProperty('isError');
    expect(utils.result).toHaveProperty('map');
    expect(utils.result).toHaveProperty('mapError');
    expect(utils.result).toHaveProperty('flatMap');
    expect(utils.result).toHaveProperty('flatMapError');
    expect(utils.result).toHaveProperty('get');
    expect(utils.result).toHaveProperty('getError');
    expect(utils.result).toHaveProperty('getOrElse');
    expect(utils.result).toHaveProperty('getErrorOrElse');
  });
  test('task utils are exported', () => {
    expect(utils).toHaveProperty('task');
    expect(utils.task).toHaveProperty('createTask');
    expect(utils.task).toHaveProperty('chainTask');
  });
});
