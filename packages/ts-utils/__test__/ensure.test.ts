import {ensure} from '../src';

const {
  ensureString,
  ensureNumber,
  ensureObject,
  ensureArray,
  DEFAULT_STRING,
  DEFAULT_NUMBER,
  DEFAULT_OBJECT,
  DEFAULT_ARRAY,
} = ensure;

const A_STRING = 'a string';
const A_USER_DEFAULT_STRING = 'a user default string';
const A_NUMBER = 1;
const A_USER_DEFAULT_NUMBER = 999;
const AN_OBJECT = {key: 'value'};
const A_USER_DEFAULT_OBJECT = {key1: 'value1'};
const AN_ARRAY = [0, 1, 2];
const A_USER_DEFAULT_ARRAY = [3, 4, 5];

describe('ensureString is working correctly', () => {
  test('ensureString without default value should return value correctly', () => {
    expect(ensureString(A_STRING)).toEqual(A_STRING);
    expect(ensureString(A_NUMBER)).toEqual(DEFAULT_STRING);
    expect(ensureString(AN_OBJECT)).toEqual(DEFAULT_STRING);
    expect(ensureString(AN_ARRAY)).toEqual(DEFAULT_STRING);
  });
  test('ensureString with default value should return value correctly', () => {
    expect(ensureString(A_STRING, A_USER_DEFAULT_STRING)).toEqual(A_STRING);
    expect(ensureString(A_NUMBER, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
    expect(ensureString(AN_OBJECT, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
    expect(ensureString(AN_ARRAY, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
  });
});

describe('ensureNumber is working correctly', () => {
  test('ensureNumber without default value should return value correctly', () => {
    expect(ensureNumber(A_STRING)).toEqual(DEFAULT_NUMBER);
    expect(ensureNumber(A_NUMBER)).toEqual(A_NUMBER);
    expect(ensureNumber(AN_OBJECT)).toEqual(DEFAULT_NUMBER);
    expect(ensureNumber(AN_ARRAY)).toEqual(DEFAULT_NUMBER);
  });
  test('ensureNumber with default value should return value correctly', () => {
    expect(ensureNumber(A_STRING, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
    expect(ensureNumber(A_NUMBER, A_USER_DEFAULT_NUMBER)).toEqual(A_NUMBER);
    expect(ensureNumber(AN_OBJECT, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
    expect(ensureNumber(AN_ARRAY, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
  });
});

describe('ensureObject is working correctly', () => {
  test('ensureObject without default value should return value correctly', () => {
    expect(ensureObject(A_STRING)).toEqual(DEFAULT_OBJECT);
    expect(ensureObject(A_NUMBER)).toEqual(DEFAULT_OBJECT);
    expect(ensureObject(AN_OBJECT)).toEqual(AN_OBJECT);
    expect(ensureObject(AN_ARRAY)).toEqual(DEFAULT_OBJECT);
  });
  test('ensureObject with default value should return value correctly', () => {
    expect(ensureObject(A_STRING, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
    expect(ensureObject(A_NUMBER, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
    expect(ensureObject(AN_OBJECT, A_USER_DEFAULT_OBJECT)).toEqual(AN_OBJECT);
    expect(ensureObject(AN_ARRAY, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
  });
});

describe('ensureArray is working correctly', () => {
  test('ensureArray without default value should return value correctly', () => {
    expect(ensureArray(A_STRING)).toEqual(DEFAULT_ARRAY);
    expect(ensureArray(A_NUMBER)).toEqual(DEFAULT_ARRAY);
    expect(ensureArray(AN_OBJECT)).toEqual(DEFAULT_ARRAY);
    expect(ensureArray(AN_ARRAY)).toEqual(AN_ARRAY);
  });
  test('ensureArray with default value should return value correctly', () => {
    expect(ensureArray(A_STRING, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensureArray(A_NUMBER, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensureArray(AN_OBJECT, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensureArray(AN_ARRAY, A_USER_DEFAULT_ARRAY)).toEqual(AN_ARRAY);
  });
});
