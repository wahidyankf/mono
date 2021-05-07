import {
  ok,
  error,
  isOk,
  isError,
  get,
  getOrElse,
  getError,
  getErrorOrElse,
  map,
  mapError,
  flatMap,
  flatMapError,
} from '../src/result';
import {some, none} from '../src/option';

describe('ok works correctly', () => {
  test('ok generates tag correctly', () => {
    expect(ok('string')).toHaveProperty('_tag');
    expect(ok('string')).toHaveProperty('value');
  });

  test('ok generates value correctly', () => {
    expect(ok('string')).toEqual({_tag: 'Ok', value: 'string'});
    expect(ok(1)).toEqual({_tag: 'Ok', value: 1});
  });
});

describe('error works correctly', () => {
  test('error generates tag correctly', () => {
    expect(error('string')).toHaveProperty('_tag');
    expect(error('string')).toHaveProperty('value');
  });

  test('error generates value correctly', () => {
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

describe('getErrorOrElse works correctly', () => {
  test('getErrorOrElse returns the value on error', () => {
    expect(getErrorOrElse('default')(error('string'))).toEqual('string');
    expect(getErrorOrElse(0)(error(1))).toEqual(1);
  });

  test('getErrorOrElse returns the default value on ok', () => {
    expect(getErrorOrElse('default')(ok('string'))).toEqual('default');
    expect(getErrorOrElse(0)(ok(1))).toEqual(0);
  });
});

describe('map works correctly', () => {
  test('map successfully maps the ok value', () => {
    expect(map((s: string) => 'hello ' + s)(ok('string'))).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(map((x: number) => x * 2)(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('map skips the operation on error', () => {
    expect(map((s: string) => 'hello ' + s)(error('string'))).toEqual({
      _tag: 'Error',
      value: 'string',
    });
    expect(map((x: number) => x * 2)(error(1))).toEqual({
      _tag: 'Error',
      value: 1,
    });
  });
});

describe('mapError works correctly', () => {
  test('mapError successfully maps the error value', () => {
    expect(mapError((s: string) => 'hello ' + s)(error('string'))).toEqual({
      _tag: 'Error',
      value: 'hello string',
    });
    expect(mapError((x: number) => x * 2)(error(1))).toEqual({
      _tag: 'Error',
      value: 1 * 2,
    });
  });
  test('mapError skips the operation on ok', () => {
    expect(mapError((s: string) => 'hello ' + s)(ok('string'))).toEqual({
      _tag: 'Ok',
      value: 'string',
    });
    expect(mapError((x: number) => x * 2)(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1,
    });
  });
});

describe('flatMap works correctly', () => {
  test('flatMap successfully maps the ok value', () => {
    expect(flatMap((s: string) => ok('hello ' + s))(ok('string'))).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(flatMap((x: number) => ok(x * 2))(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('flatMap skips the operation on error', () => {
    expect(flatMap((s: string) => ok('hello ' + s))(error('string'))).toEqual({
      _tag: 'Error',
      value: 'string',
    });
    expect(flatMap((x: number) => ok(x * 2))(error(1))).toEqual({
      _tag: 'Error',
      value: 1,
    });
  });
});

describe('flatMapError works correctly', () => {
  test('flatMapError successfully maps the error value', () => {
    expect(
      flatMapError((s: string) => error('hello ' + s))(error('string')),
    ).toEqual({
      _tag: 'Error',
      value: 'hello string',
    });
    expect(flatMapError((x: number) => error(x * 2))(error(1))).toEqual({
      _tag: 'Error',
      value: 1 * 2,
    });
  });
  test('flatMapError skips the operation on ok', () => {
    expect(
      flatMapError((s: string) => error('hello ' + s))(ok('string')),
    ).toEqual({
      _tag: 'Ok',
      value: 'string',
    });
    expect(flatMapError((x: number) => error(x * 2))(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1,
    });
  });
});
