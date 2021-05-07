import {attempt} from '../src/attempt';
import {ok, error} from '../src/result';
import {some} from '../src/option';

describe('attempt works correctly', () => {
  test('it generates tags correctly', () => {
    expect(attempt(() => eval('null.test'))).toHaveProperty('_tag');
    expect(attempt(() => eval('null.test'))).toHaveProperty('value');
    expect(attempt(() => 'str')).toHaveProperty('_tag');
    expect(attempt(() => 'str')).toHaveProperty('value');
  });

  test('it correctly returns successful result', () => {
    expect(attempt(() => 'str')).toEqual(ok('str'));
    expect(attempt(() => 1)).toEqual(ok(1));
    expect(attempt(() => some('str'))).toEqual(ok(some('str')));
    expect(attempt(() => 1 / 0)).toEqual(ok(Infinity));
    expect(attempt(() => {})).toEqual(ok(undefined));
  });

  test('it correctly returns error result on default error message key', () => {
    expect(attempt(() => eval('null.test'))).toEqual(
      error("Cannot read property 'test' of null"),
    );
    expect(
      attempt(() => {
        throw 'some error message';
      }),
    ).toEqual(error('some error message'));
    expect(
      attempt(() => {
        throw {message: 'some error message'};
      }),
    ).toEqual(error('some error message'));
  });

  test('it correctly returns error result on custom error message key', () => {
    expect(attempt(() => eval('null.test'), 'description')).toEqual(
      error('{}'),
    );
    expect(
      attempt(() => {
        throw 'some error message';
      }, 'description'),
    ).toEqual(error('some error message'));
    expect(
      attempt(() => {
        throw {description: 'some error message'};
      }, 'description'),
    ).toEqual(error('some error message'));
  });
});
