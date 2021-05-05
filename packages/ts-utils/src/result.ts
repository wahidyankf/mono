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

export function map() {}
export function mapError() {}
export function flatMap() {}
export function flatMapError() {}
export function get() {}
export function getError() {}
export function getOrElse() {}
export function getErrorOrElse() {}

export default {
  ok,
  error,
  isOk,
  isError,
  map,
  mapError,
  flatMap,
  flatMapError,
  get,
  getError,
  getOrElse,
  getErrorOrElse,
};
