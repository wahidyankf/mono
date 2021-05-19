import {option} from '../src';

describe('some works correctly', () => {
  test('some generates tag correctly', () => {
    expect(option.some('string')).toHaveProperty('_tag');
    expect(option.some('string')).toHaveProperty('value');
  });

  test('some generates value correctly', () => {
    expect(option.some('string')).toEqual({_tag: 'Some', value: 'string'});
    expect(option.some(1)).toEqual({_tag: 'Some', value: 1});
  });
});

describe('none works correctly', () => {
  test('none generates tag correctly', () => {
    expect(option.none()).toHaveProperty('_tag');
    expect(option.none()).not.toHaveProperty('value');
  });

  test('none generates value correctly', () => {
    expect(option.none()).toEqual({_tag: 'None'});
  });
});

describe('isSome works correctly', () => {
  test('isSome returns true on someString', () => {
    expect(option.isSome(option.some('string'))).toEqual(true);
  });

  test('isSome returns true on someNumber', () => {
    expect(option.isSome(option.some(1))).toEqual(true);
  });

  test('isSome returns false on nothing', () => {
    expect(option.isSome(option.none())).toEqual(false);
  });
});

describe('isNone works correctly', () => {
  test('isNone returns true on nothing', () => {
    expect(option.isNone(option.none())).toEqual(true);
  });

  test('isNone returns false on someString', () => {
    expect(option.isNone(option.some('string'))).toEqual(false);
  });

  test('isNone returns false on someNumber', () => {
    expect(option.isNone(option.some(1))).toEqual(false);
  });
});

describe('getOrElse works correctly', () => {
  test('getOrElse returns the value on some', () => {
    expect(option.getOrElse('default')(option.some('string'))).toEqual(
      'string',
    );
    expect(option.getOrElse(0)(option.some(1))).toEqual(1);
  });

  test('getOrElse returns the default value on nothing', () => {
    expect(option.getOrElse('default')(option.none())).toEqual('default');
    expect(option.getOrElse(0)(option.none())).toEqual(0);
  });
});

describe('map works correctly', () => {
  test('map successfully maps the value', () => {
    expect(
      option.map((s: string) => 'hello ' + s)(option.some('string')),
    ).toEqual({
      _tag: 'Some',
      value: 'hello string',
    });
    expect(option.map((x: number) => x * 2)(option.some(1))).toEqual({
      _tag: 'Some',
      value: 1 * 2,
    });
  });
  test('map skips the operation on nothing', () => {
    expect(option.map((s: string) => 'hello ' + s)(option.none())).toEqual({
      _tag: 'None',
    });
    expect(option.map((x: number) => x * 2)(option.none())).toEqual({
      _tag: 'None',
    });
  });
});

describe('flatMap works correctly', () => {
  test('flatMap successfully maps the value', () => {
    expect(
      option.flatMap((s: string) => option.some('hello ' + s))(
        option.some('string'),
      ),
    ).toEqual({
      _tag: 'Some',
      value: 'hello string',
    });
    expect(
      option.flatMap((x: number) => option.some(x * 2))(option.some(1)),
    ).toEqual({
      _tag: 'Some',
      value: 1 * 2,
    });
  });
  test('flatMap skips the operation on nothing', () => {
    expect(
      option.flatMap((x: number) => option.some(x * 2))(option.none()),
    ).toEqual({
      _tag: 'None',
    });
    expect(
      option.flatMap((s: string) => option.some('hello ' + s))(option.none()),
    ).toEqual({
      _tag: 'None',
    });
  });
});
