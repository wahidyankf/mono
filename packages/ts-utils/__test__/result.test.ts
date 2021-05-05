import {
  ok,
  error,
  isOk,
  isError,
  get,
  getOrElse,
  getError,
} from '../src/result';
import {some, none} from '../src/option';

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
  test('isOk returns true on ok', () => {
    expect(isOk(ok('string'))).toEqual(true);
    expect(isOk(ok(1))).toEqual(true);
  });

  test('isOk returns false on error', () => {
    expect(isOk(error('string'))).toEqual(false);
    expect(isOk(error(1))).toEqual(false);
  });
});

describe('isError works correctly', () => {
  test('isError returns true on error', () => {
    expect(isError(error('string'))).toEqual(true);
    expect(isError(error(1))).toEqual(true);
  });

  test('isError returns false on ok', () => {
    expect(isError(ok('string'))).toEqual(false);
    expect(isError(ok(1))).toEqual(false);
  });
});

describe('get works correctly', () => {
  test('get returns some value on ok', () => {
    expect(get(ok('string'))).toEqual(some('string'));
    expect(get(ok(1))).toEqual(some(1));
  });

  test('get returns none on error', () => {
    expect(get(error('string'))).toEqual(none());
    expect(get(error(1))).toEqual(none());
  });
});

describe('getError works correctly', () => {
  test('getError returns some value on error', () => {
    expect(getError(error('string'))).toEqual(some('string'));
    expect(getError(error(1))).toEqual(some(1));
  });

  test('getError returns none on ok', () => {
    expect(getError(ok('string'))).toEqual(none());
    expect(getError(ok(1))).toEqual(none());
  });
});

describe('getOrElse works correctly', () => {
  test('getOrElse returns the value on ok', () => {
    expect(getOrElse('default')(ok('string'))).toEqual('string');
    expect(getOrElse(0)(ok(1))).toEqual(1);
  });

  test('getOrElse returns the default value on error', () => {
    expect(getOrElse('default')(error('string'))).toEqual('default');
    expect(getOrElse(0)(error(1))).toEqual(0);
  });
});
