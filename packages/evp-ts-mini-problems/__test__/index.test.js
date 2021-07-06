// import {log} from '../dist';
const {log} = require('../dist');

test('console.log has been called 1 time', () => {
  console.log = jest.fn();
  log();

  expect(console.log).toHaveBeenCalledTimes(1);
});

test('console.log has been called with "test"', () => {
  console.log = jest.fn();
  log();

  expect(console.log).toHaveBeenCalledWith('test');
});
