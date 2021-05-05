import {log} from '../src';

test('console.log has been called 2 times', () => {
  console.log = jest.fn();
  log();

  expect(console.log).toHaveBeenCalledTimes(2);
});

test('console.log has been called with "The meaning of life: 42"', () => {
  console.log = jest.fn();
  log();

  expect(console.log).toHaveBeenCalledWith('The meaning of life: 42');
});

test('console.log has been called with "Super Cool: it is super cool!"', () => {
  console.log = jest.fn();
  log();

  expect(console.log).toHaveBeenCalledWith('Super Cool: it is super cool!');
});
