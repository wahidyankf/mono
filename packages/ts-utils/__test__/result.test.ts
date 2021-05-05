import {ok, error, isOk, isError} from '../src/result';

describe('ok works correctly', () => {
  test('ok generate tag correctly', () => {
    expect(ok('string')).toHaveProperty('_tag');
    expect(ok('string')).toHaveProperty('value');
  });

  test('ok generate value correctly', () => {
    expect(ok('string')).toEqual({_tag: 'Ok', value: 'string'});
    expect(ok(1)).toEqual({_tag: 'Ok', value: 1});
  });
});

describe('error works correctly', () => {
  test('error generate tag correctly', () => {
    expect(error('string')).toHaveProperty('_tag');
    expect(error('string')).toHaveProperty('value');
  });

  test('error generate value correctly', () => {
    expect(error('string')).toEqual({_tag: 'Error', value: 'string'});
    expect(error(1)).toEqual({_tag: 'Error', value: 1});
  });
});

describe('isOk works correctly', () => {
  test('isOk returns true on okString', () => {
    expect(isOk(ok('string'))).toEqual(true);
  });

  test('isOk returns true on okNumber', () => {
    expect(isOk(ok(1))).toEqual(true);
  });

  test('isOk returns false on errorString', () => {
    expect(isOk(error('string'))).toEqual(false);
  });

  test('isOk returns false on errorNumber', () => {
    expect(isOk(error(1))).toEqual(false);
  });
});

describe('isError works correctly', () => {
  test('isError returns true on errorString', () => {
    expect(isError(error('string'))).toEqual(true);
  });

  test('isError returns true on errorNumber', () => {
    expect(isError(error(1))).toEqual(true);
  });

  test('isError returns false on okString', () => {
    expect(isError(ok('string'))).toEqual(false);
  });

  test('isError returns false on okNumber', () => {
    expect(isError(ok(1))).toEqual(false);
  });
});
