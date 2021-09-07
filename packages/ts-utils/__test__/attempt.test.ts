import {attempt, result, option} from '../src';

describe('attempt works correctly', () => {
  test('it generates tags correctly', () => {
    expect(attempt(() => eval('null.test'))).toHaveProperty('_tag');
    expect(attempt(() => eval('null.test'))).toHaveProperty('value');
    expect(attempt(() => 'str')).toHaveProperty('_tag');
    expect(attempt(() => 'str')).toHaveProperty('value');
  });

  test('it correctly returns successful result', () => {
    expect(attempt(() => 'str')).toEqual(result.ok('str'));
    expect(attempt(() => 1)).toEqual(result.ok(1));
    expect(attempt(() => option.some('str'))).toEqual(
      result.ok(option.some('str')),
    );
    expect(attempt(() => 1 / 0)).toEqual(result.ok(Infinity));
    expect(attempt(() => {})).toEqual(result.ok(undefined));
  });

  test('it correctly returns error result on default error message key', () => {
    expect(result.isError(attempt(() => eval('null.test')))).toEqual(true);
    expect(
      attempt(() => {
        throw 'some error message';
      }),
    ).toEqual(result.error('some error message'));
    expect(
      attempt(() => {
        throw {message: 'some error message'};
      }),
    ).toEqual(result.error('some error message'));
  });

  test('it correctly returns error result on custom error message key', () => {
    expect(attempt(() => eval('null.test'), 'description')).toEqual(
      result.error('{}'),
    );
    expect(
      attempt(() => {
        throw 'some error message';
      }, 'description'),
    ).toEqual(result.error('some error message'));
    expect(
      attempt(() => {
        throw {description: 'some error message'};
      }, 'description'),
    ).toEqual(result.error('some error message'));
  });
});
