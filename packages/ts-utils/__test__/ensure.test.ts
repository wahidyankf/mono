import {ensure} from '../src';

const A_STRING = 'a string';
const A_USER_DEFAULT_STRING = 'a user default string';
const A_NUMBER = 1;
const A_USER_DEFAULT_NUMBER = 999;
const AN_OBJECT = {key: 'value'};
const A_USER_DEFAULT_OBJECT = {key1: 'value1'};
const AN_ARRAY = [0, 1, 2];
const A_USER_DEFAULT_ARRAY = [3, 4, 5];

describe('ensure.string is working correctly', () => {
  test('ensure.string without default value should return value correctly', () => {
    expect(ensure.string(A_STRING)).toEqual(A_STRING);
    expect(ensure.string(A_NUMBER)).toEqual(ensure.DEFAULT_STRING);
    expect(ensure.string(AN_OBJECT)).toEqual(ensure.DEFAULT_STRING);
    expect(ensure.string(AN_ARRAY)).toEqual(ensure.DEFAULT_STRING);
  });
  test('ensure.string with default value should return value correctly', () => {
    expect(ensure.string(A_STRING, A_USER_DEFAULT_STRING)).toEqual(A_STRING);
    expect(ensure.string(A_NUMBER, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
    expect(ensure.string(AN_OBJECT, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
    expect(ensure.string(AN_ARRAY, A_USER_DEFAULT_STRING)).toEqual(
      A_USER_DEFAULT_STRING,
    );
  });
});

describe('ensure.number is working correctly', () => {
  test('ensure.number without default value should return value correctly', () => {
    expect(ensure.number(A_STRING)).toEqual(ensure.DEFAULT_NUMBER);
    expect(ensure.number(A_NUMBER)).toEqual(A_NUMBER);
    expect(ensure.number(AN_OBJECT)).toEqual(ensure.DEFAULT_NUMBER);
    expect(ensure.number(AN_ARRAY)).toEqual(ensure.DEFAULT_NUMBER);
  });
  test('ensure.number with default value should return value correctly', () => {
    expect(ensure.number(A_STRING, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
    expect(ensure.number(A_NUMBER, A_USER_DEFAULT_NUMBER)).toEqual(A_NUMBER);
    expect(ensure.number(AN_OBJECT, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
    expect(ensure.number(AN_ARRAY, A_USER_DEFAULT_NUMBER)).toEqual(
      A_USER_DEFAULT_NUMBER,
    );
  });
});

describe('ensure.object is working correctly', () => {
  test('ensure.object without default value should return value correctly', () => {
    expect(ensure.object(A_STRING)).toEqual(ensure.DEFAULT_OBJECT);
    expect(ensure.object(A_NUMBER)).toEqual(ensure.DEFAULT_OBJECT);
    expect(ensure.object(AN_OBJECT)).toEqual(AN_OBJECT);
    expect(ensure.object(AN_ARRAY)).toEqual(ensure.DEFAULT_OBJECT);
  });
  test('ensure.object with default value should return value correctly', () => {
    expect(ensure.object(A_STRING, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
    expect(ensure.object(A_NUMBER, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
    expect(ensure.object(AN_OBJECT, A_USER_DEFAULT_OBJECT)).toEqual(AN_OBJECT);
    expect(ensure.object(AN_ARRAY, A_USER_DEFAULT_OBJECT)).toEqual(
      A_USER_DEFAULT_OBJECT,
    );
  });
});

describe('ensure.array is working correctly', () => {
  test('ensure.array without default value should return value correctly', () => {
    expect(ensure.array(A_STRING)).toEqual(ensure.DEFAULT_ARRAY);
    expect(ensure.array(A_NUMBER)).toEqual(ensure.DEFAULT_ARRAY);
    expect(ensure.array(AN_OBJECT)).toEqual(ensure.DEFAULT_ARRAY);
    expect(ensure.array(AN_ARRAY)).toEqual(AN_ARRAY);
  });
  test('ensure.array with default value should return value correctly', () => {
    expect(ensure.array(A_STRING, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensure.array(A_NUMBER, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensure.array(AN_OBJECT, A_USER_DEFAULT_ARRAY)).toEqual(
      A_USER_DEFAULT_ARRAY,
    );
    expect(ensure.array(AN_ARRAY, A_USER_DEFAULT_ARRAY)).toEqual(AN_ARRAY);
  });
});
