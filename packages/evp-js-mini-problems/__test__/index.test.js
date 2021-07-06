const {checkSanity, SANITY_CHECK} = require('../src');

test('console.log has been called 1 time', () => {
  console.log = jest.fn();
  checkSanity();

  expect(console.log).toHaveBeenCalledTimes(1);
});

test(`console.log has been called with ${SANITY_CHECK}`, () => {
  console.log = jest.fn();
  checkSanity();

  expect(console.log).toHaveBeenCalledWith(SANITY_CHECK);
});
