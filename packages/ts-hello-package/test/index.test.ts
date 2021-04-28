import {meaningOfLife, superCool} from '../src/index';

test('meaningOfLife', () => {
  expect(meaningOfLife).toEqual(42);
});

test('superCool', () => {
  expect(superCool).toEqual('it is super cool!');
});
