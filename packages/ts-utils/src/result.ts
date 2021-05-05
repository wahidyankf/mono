import option, {none, Option} from './option';

interface Ok<T> {
  readonly _tag: 'Ok';
  readonly value: T;
}

interface Error<T> {
  readonly _tag: 'Error';
  readonly value: T;
}

export type Result<T, U> = Ok<T> | Error<U>;

export function ok<T, U>(value: T): Result<T, U> {
  return {_tag: 'Ok', value};
}

export function error<T, U>(value: U): Result<T, U> {
  return {_tag: 'Error', value};
}

export function isOk<T, U>(result: Result<T, U>): boolean {
  return result._tag === 'Ok';
}

export function isError<T, U>(result: Result<T, U>): boolean {
  return result._tag === 'Error';
}

export function get<T, U>(result: Result<T, U>): Option<T> {
  if (result._tag === 'Ok') {
    return option.some(result.value);
  } else {
    return option.none();
  }
}

export function getError<T, U>(result: Result<T, U>): Option<U> {
  if (result._tag === 'Error') {
    return option.some(result.value);
  } else {
    return option.none();
  }
}

export function getOrElse<T, U>(value: T): (result: Result<T, U>) => T {
  return (result: Result<T, U>): T => {
    if (result._tag === 'Ok') {
      return result.value;
    } else {
      return value;
    }
  };
}

export function getErrorOrElse<T, U>(value: U): (result: Result<T, U>) => U {
  return (result: Result<T, U>): U => {
    if (result._tag === 'Error') {
      return result.value;
    } else {
      return value;
    }
  };
}

export function map<T, U, T1>(
  fn: (value: T) => T1,
): (result: Result<T, U>) => Result<T1, U> {
  return (result) => {
    if (result._tag === 'Ok') {
      return ok(fn(result.value));
    } else {
      return result as Result<T1, U>;
    }
  };
}

export function mapError<T, U, U1>(
  fn: (value: U) => U1,
): (result: Result<T, U>) => Result<T, U1> {
  return (result) => {
    if (result._tag === 'Error') {
      return error(fn(result.value));
    } else {
      return result as Result<T, U1>;
    }
  };
}

export function flatMap() {}

export function flatMapError() {}

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
