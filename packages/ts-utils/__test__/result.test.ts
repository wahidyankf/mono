import {
  ok,
  error,
  isOk,
  isError,
  getOk,
  getOkOrElse,
  getError,
  getErrorOrElse,
  mapOk,
  mapError,
  flatMapOk,
  flatMapError,
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

describe('getOk works correctly', () => {
  test('getOk returns some value on ok', () => {
    expect(getOk(ok('string'))).toEqual(some('string'));
    expect(getOk(ok(1))).toEqual(some(1));
  });

  test('getOk returns none on error', () => {
    expect(getOk(error('string'))).toEqual(none());
    expect(getOk(error(1))).toEqual(none());
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

describe('getOkOrElse works correctly', () => {
  test('getOkOrElse returns the value on ok', () => {
    expect(getOkOrElse('default')(ok('string'))).toEqual('string');
    expect(getOkOrElse(0)(ok(1))).toEqual(1);
  });

  test('getOkOrElse returns the default value on error', () => {
    expect(getOkOrElse('default')(error('string'))).toEqual('default');
    expect(getOkOrElse(0)(error(1))).toEqual(0);
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

describe('mapOk works correctly', () => {
  test('mapOk successfully mapOk the ok value', () => {
    expect(mapOk((s: string) => 'hello ' + s)(ok('string'))).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(mapOk((x: number) => x * 2)(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('mapOk skips the operation on error', () => {
    expect(mapOk((s: string) => 'hello ' + s)(error('string'))).toEqual({
      _tag: 'Error',
      value: 'string',
    });
    expect(mapOk((x: number) => x * 2)(error(1))).toEqual({
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

describe('flatMapOk works correctly', () => {
  test('flatMapOk successfully maps the ok value', () => {
    expect(flatMapOk((s: string) => ok('hello ' + s))(ok('string'))).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(flatMapOk((x: number) => ok(x * 2))(ok(1))).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('flatMapOk skips the operation on error', () => {
    expect(flatMapOk((s: string) => ok('hello ' + s))(error('string'))).toEqual(
      {
        _tag: 'Error',
        value: 'string',
      },
    );
    expect(flatMapOk((x: number) => ok(x * 2))(error(1))).toEqual({
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
