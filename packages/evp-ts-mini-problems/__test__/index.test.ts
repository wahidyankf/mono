import {sanityCheck} from '../src';

test('console.log has been called 1 time', () => {
  console.log = jest.fn();
  sanityCheck();

  expect(console.log).toHaveBeenCalledTimes(1);
});

test('console.log has been called with "test"', () => {
  console.log = jest.fn();
  sanityCheck();

  expect(console.log).toHaveBeenCalledWith('sanity check');
});
