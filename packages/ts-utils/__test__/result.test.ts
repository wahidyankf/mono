import {ok, error} from '../src/result';

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
