import option, {Option} from './option';
import {ADT} from './adt';

export type Result<T, E> = ADT<{Ok: {value: T}; Error: {value: E}}>;

export function ok<T, E>(value: T): Result<T, E> {
  return {_tag: 'Ok', value};
}

export function error<T, E>(value: E): Result<T, E> {
  return {_tag: 'Error', value};
}

export function isOk<T, E>(result: Result<T, E>): boolean {
  return result._tag === 'Ok';
}

export function isError<T, E>(result: Result<T, E>): boolean {
  return result._tag === 'Error';
}

export function get<T, E>(result: Result<T, E>): Option<T> {
  if (result._tag === 'Ok') {
    return option.some(result.value);
  } else {
    return option.none();
  }
}

export function getError<T, E>(result: Result<T, E>): Option<E> {
  if (result._tag === 'Error') {
    return option.some(result.value);
  } else {
    return option.none();
  }
}

export function getOrElse<T, E>(value: T): (result: Result<T, E>) => T {
  return (result: Result<T, E>): T => {
    if (result._tag === 'Ok') {
      return result.value;
    } else {
      return value;
    }
  };
}

export function getErrorOrElse<T, E>(value: E): (result: Result<T, E>) => E {
  return (result: Result<T, E>): E => {
    if (result._tag === 'Error') {
      return result.value;
    } else {
      return value;
    }
  };
}

export function map<T, E, T1>(
  fn: (value: T) => T1,
): (result: Result<T, E>) => Result<T1, E> {
  return (result) => {
    if (result._tag === 'Ok') {
      return ok(fn(result.value));
    } else {
      return result as Result<T1, E>;
    }
  };
}

export function mapError<T, E, E1>(
  fn: (value: E) => E1,
): (result: Result<T, E>) => Result<T, E1> {
  return (result) => {
    if (result._tag === 'Error') {
      return error(fn(result.value));
    } else {
      return result as Result<T, E1>;
    }
  };
}

export function flatMap<T, E, T1>(
  fn: (value: T) => Result<T1, E>,
): (result: Result<T, E>) => Result<T1, E> {
  return (result: Result<T, E>) => {
    if (result._tag === 'Ok') {
      return fn(result.value);
    } else {
      return result as Result<T1, E>;
    }
  };
}

export function flatMapError<T, E, E1>(
  fn: (value: E) => Result<T, E1>,
): (result: Result<T, E>) => Result<T, E1> {
  return (result: Result<T, E>) => {
    if (result._tag === 'Error') {
      return fn(result.value);
    } else {
      return result as Result<T, E1>;
    }
  };
}

export default {
  ok,
  error,
  isOk,
  isError,
  get,
  getError,
  getOrElse,
  getErrorOrElse,
  map,
  mapError,
  flatMap,
  flatMapError,
};
