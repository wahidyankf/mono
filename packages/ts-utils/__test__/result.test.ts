import {option, result} from '../src';

describe('ok works correctly', () => {
  test('ok generates tag correctly', () => {
    expect(result.ok('string')).toHaveProperty('_tag');
    expect(result.ok('string')).toHaveProperty('value');
  });

  test('ok generates value correctly', () => {
    expect(result.ok('string')).toEqual({_tag: 'Ok', value: 'string'});
    expect(result.ok(1)).toEqual({_tag: 'Ok', value: 1});
  });
});

describe('error works correctly', () => {
  test('error generates tag correctly', () => {
    expect(result.error('string')).toHaveProperty('_tag');
    expect(result.error('string')).toHaveProperty('value');
  });

  test('error generates value correctly', () => {
    expect(result.error('string')).toEqual({_tag: 'Error', value: 'string'});
    expect(result.error(1)).toEqual({_tag: 'Error', value: 1});
  });
});

describe('isOk works correctly', () => {
  test('isOk returns true on ok', () => {
    expect(result.isOk(result.ok('string'))).toEqual(true);
    expect(result.isOk(result.ok(1))).toEqual(true);
  });

  test('isOk returns false on error', () => {
    expect(result.isOk(result.error('string'))).toEqual(false);
    expect(result.isOk(result.error(1))).toEqual(false);
  });
});

describe('isError works correctly', () => {
  test('isError returns true on error', () => {
    expect(result.isError(result.error('string'))).toEqual(true);
    expect(result.isError(result.error(1))).toEqual(true);
  });

  test('isError returns false on ok', () => {
    expect(result.isError(result.ok('string'))).toEqual(false);
    expect(result.isError(result.ok(1))).toEqual(false);
  });
});

describe('get works correctly', () => {
  test('get returns some value on ok', () => {
    expect(result.get(result.ok('string'))).toEqual(option.some('string'));
    expect(result.get(result.ok(1))).toEqual(option.some(1));
  });

  test('get returns none on error', () => {
    expect(result.get(result.error('string'))).toEqual(option.none());
    expect(result.get(result.error(1))).toEqual(option.none());
  });
});

describe('getError works correctly', () => {
  test('getError returns some value on error', () => {
    expect(result.getError(result.error('string'))).toEqual(
      option.some('string'),
    );
    expect(result.getError(result.error(1))).toEqual(option.some(1));
  });

  test('getError returns none on ok', () => {
    expect(result.getError(result.ok('string'))).toEqual(option.none());
    expect(result.getError(result.ok(1))).toEqual(option.none());
  });
});

describe('getOrElse works correctly', () => {
  test('getOrElse returns the value on ok', () => {
    expect(result.getOrElse('default')(result.ok('string'))).toEqual('string');
    expect(result.getOrElse(0)(result.ok(1))).toEqual(1);
  });

  test('getOrElse returns the default value on error', () => {
    expect(result.getOrElse('default')(result.error('string'))).toEqual(
      'default',
    );
    expect(result.getOrElse(0)(result.error(1))).toEqual(0);
  });
});

describe('getErrorOrElse works correctly', () => {
  test('getErrorOrElse returns the value on error', () => {
    expect(result.getErrorOrElse('default')(result.error('string'))).toEqual(
      'string',
    );
    expect(result.getErrorOrElse(0)(result.error(1))).toEqual(1);
  });

  test('getErrorOrElse returns the default value on ok', () => {
    expect(result.getErrorOrElse('default')(result.ok('string'))).toEqual(
      'default',
    );
    expect(result.getErrorOrElse(0)(result.ok(1))).toEqual(0);
  });
});

describe('map works correctly', () => {
  test('map successfully maps the ok value', () => {
    expect(
      result.map((s: string) => 'hello ' + s)(result.ok('string')),
    ).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(result.map((x: number) => x * 2)(result.ok(1))).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('map skips the operation on error', () => {
    expect(
      result.map((s: string) => 'hello ' + s)(result.error('string')),
    ).toEqual({
      _tag: 'Error',
      value: 'string',
    });
    expect(result.map((x: number) => x * 2)(result.error(1))).toEqual({
      _tag: 'Error',
      value: 1,
    });
  });
});

describe('mapError works correctly', () => {
  test('mapError successfully maps the error value', () => {
    expect(
      result.mapError((s: string) => 'hello ' + s)(result.error('string')),
    ).toEqual({
      _tag: 'Error',
      value: 'hello string',
    });
    expect(result.mapError((x: number) => x * 2)(result.error(1))).toEqual({
      _tag: 'Error',
      value: 1 * 2,
    });
  });
  test('mapError skips the operation on ok', () => {
    expect(
      result.mapError((s: string) => 'hello ' + s)(result.ok('string')),
    ).toEqual({
      _tag: 'Ok',
      value: 'string',
    });
    expect(result.mapError((x: number) => x * 2)(result.ok(1))).toEqual({
      _tag: 'Ok',
      value: 1,
    });
  });
});

describe('flatMap works correctly', () => {
  test('flatMap successfully maps the ok value', () => {
    expect(
      result.flatMap((s: string) => result.ok('hello ' + s))(
        result.ok('string'),
      ),
    ).toEqual({
      _tag: 'Ok',
      value: 'hello string',
    });
    expect(
      result.flatMap((x: number) => result.ok(x * 2))(result.ok(1)),
    ).toEqual({
      _tag: 'Ok',
      value: 1 * 2,
    });
  });
  test('flatMap skips the operation on error', () => {
    expect(
      result.flatMap((s: string) => result.ok('hello ' + s))(
        result.error('string'),
      ),
    ).toEqual({
      _tag: 'Error',
      value: 'string',
    });
    expect(
      result.flatMap((x: number) => result.ok(x * 2))(result.error(1)),
    ).toEqual({
      _tag: 'Error',
      value: 1,
    });
  });
});

describe('flatMapError works correctly', () => {
  test('flatMapError successfully maps the error value', () => {
    expect(
      result.flatMapError((s: string) => result.error('hello ' + s))(
        result.error('string'),
      ),
    ).toEqual({
      _tag: 'Error',
      value: 'hello string',
    });
    expect(
      result.flatMapError((x: number) => result.error(x * 2))(result.error(1)),
    ).toEqual({
      _tag: 'Error',
      value: 1 * 2,
    });
  });
  test('flatMapError skips the operation on ok', () => {
    expect(
      result.flatMapError((s: string) => result.error('hello ' + s))(
        result.ok('string'),
      ),
    ).toEqual({
      _tag: 'Ok',
      value: 'string',
    });
    expect(
      result.flatMapError((x: number) => result.error(x * 2))(result.ok(1)),
    ).toEqual({
      _tag: 'Ok',
      value: 1,
    });
  });
});
