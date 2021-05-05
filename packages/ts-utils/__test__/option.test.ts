import {
  some,
  isSome,
  none,
  isNone,
  flatMap,
  map,
  getOrElse,
} from '../src/option';

describe('some works correctly', () => {
  test('some generate tag correctly', () => {
    expect(some('string')).toHaveProperty('_tag');
    expect(some('string')).toHaveProperty('value');
  });

  test('some generate value correctly', () => {
    expect(some('string')).toEqual({_tag: 'Some', value: 'string'});
    expect(some(1)).toEqual({_tag: 'Some', value: 1});
  });
});

describe('none works correctly', () => {
  test('none generate tag correctly', () => {
    expect(none()).toHaveProperty('_tag');
    expect(none()).not.toHaveProperty('value');
  });

  test('none generate value correctly', () => {
    expect(none()).toEqual({_tag: 'None'});
  });
});

describe('isSome works correctly', () => {
  test('isSome returns true on someString', () => {
    expect(isSome(some('string'))).toEqual(true);
  });

  test('isSome returns true on someNumber', () => {
    expect(isSome(some(1))).toEqual(true);
  });

  test('isSome returns false on nothing', () => {
    expect(isSome(none())).toEqual(false);
  });
});

describe('isNone works correctly', () => {
  test('isNone returns true on nothing', () => {
    expect(isNone(none())).toEqual(true);
  });

  test('isNone returns false on someString', () => {
    expect(isNone(some('string'))).toEqual(false);
  });

  test('isNone returns false on someNumber', () => {
    expect(isNone(some(1))).toEqual(false);
  });
});

describe('getOrElse works correctly', () => {
  test('getOrElse returns the value on some', () => {
    expect(getOrElse('default')(some('string'))).toEqual('string');
    expect(getOrElse(0)(some(1))).toEqual(1);
  });

  test('getOrElse returns the default value on nothing', () => {
    expect(getOrElse('default')(none())).toEqual('default');
    expect(getOrElse(0)(none())).toEqual(0);
  });
});

describe('map works correctly', () => {
  test('map successfully maps the value', () => {
    expect(map((s: string) => 'hello ' + s)(some('string'))).toEqual({
      _tag: 'Some',
      value: 'hello string',
    });
    expect(map((x: number) => x * 2)(some(1))).toEqual({
      _tag: 'Some',
      value: 1 * 2,
    });
  });
  test('map skips the operation on nothing', () => {
    expect(map((s: string) => 'hello ' + s)(none())).toEqual({
      _tag: 'None',
    });
    expect(map((x: number) => x * 2)(none())).toEqual({
      _tag: 'None',
    });
  });
});

describe('flatMap works correctly', () => {
  test('flatMap successfully maps the value', () => {
    expect(flatMap((s: string) => some('hello ' + s))(some('string'))).toEqual({
      _tag: 'Some',
      value: 'hello string',
    });
    expect(flatMap((x: number) => some(x * 2))(some(1))).toEqual({
      _tag: 'Some',
      value: 1 * 2,
    });
  });
  test('flatMap skips the operation on nothing', () => {
    expect(flatMap((x: number) => some(x * 2))(none())).toEqual({
      _tag: 'None',
    });
    expect(flatMap((s: string) => some('hello ' + s))(none())).toEqual({
      _tag: 'None',
    });
  });
});
