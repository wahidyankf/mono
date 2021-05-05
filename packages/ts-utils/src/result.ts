interface Ok<T> {
  readonly _tag: 'Ok';
  readonly value: T;
}

interface Error<T> {
  readonly _tag: 'Error';
  readonly value: T;
}

export type Result<T, U> = Ok<T> | Error<U>;

export function ok<T, U>(val: T): Result<T, U> {
  return {_tag: 'Ok', value: val};
}

export function error() {}
export function isOk() {}
export function isError() {}
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
