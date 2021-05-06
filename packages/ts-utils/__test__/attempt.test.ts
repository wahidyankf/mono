import {attempt} from '../src/attempt';

describe('attempt works correctly', () => {
  test('attempt generate tags correctly', () => {
    expect(attempt(() => eval('null.test'))).toHaveProperty('_tag');
    expect(attempt(() => eval('null.test'))).toHaveProperty('value');
    expect(attempt(() => 1 / 0)).toHaveProperty('_tag');
    expect(attempt(() => 1 / 0)).toHaveProperty('value');
    expect(attempt(() => 'hello')).toHaveProperty('_tag');
    expect(attempt(() => 'hello')).toHaveProperty('value');
  });
});
