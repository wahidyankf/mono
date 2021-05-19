import {ensure} from '../src';

const {ensureString, ensureNumber, ensureObject, ensureArray} = ensure;

const A_STRING = 'a string';
const A_NUMBER = 1;
const AN_OBJECT = {key: 'value'};
const AN_ARRAY = [0, 1, 2];

describe('ensureString is working correctly', () => {
  test('it should return original value for string arg', () => {
    expect(ensureString(A_STRING)).toEqual(A_STRING);
  });
  test('it should return default value for non string arg', () => {
    expect(ensureString(A_NUMBER)).toEqual('');
    expect(ensureString(AN_OBJECT)).toEqual('');
    expect(ensureString(AN_ARRAY)).toEqual('');
  });
});

describe('ensureNumber is working correctly', () => {
  test('it should return original value for string arg', () => {
    expect(ensureNumber(A_NUMBER)).toEqual(A_NUMBER);
  });
  test('it should return default value for non string arg', () => {
    expect(ensureNumber(A_STRING)).toEqual(0);
    expect(ensureNumber(AN_OBJECT)).toEqual(0);
    expect(ensureNumber(AN_ARRAY)).toEqual(0);
  });
});

describe('ensureObject is working correctly', () => {
  test('it should return original value for string arg', () => {
    expect(ensureObject(AN_OBJECT)).toEqual(AN_OBJECT);
  });
  test('it should return default value for non string arg', () => {
    expect(ensureObject(A_STRING)).toEqual({});
    expect(ensureObject(A_NUMBER)).toEqual({});
    expect(ensureObject(AN_ARRAY)).toEqual({});
  });
});

describe('ensureArray is working correctly', () => {
  test('it should return original value for string arg', () => {
    expect(ensureArray(AN_ARRAY)).toEqual(AN_ARRAY);
  });
  test('it should return default value for non string arg', () => {
    expect(ensureArray(A_STRING)).toEqual([]);
    expect(ensureArray(A_NUMBER)).toEqual([]);
    expect(ensureArray(AN_OBJECT)).toEqual([]);
  });
});
