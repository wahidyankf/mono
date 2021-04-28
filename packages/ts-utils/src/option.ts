interface None {
  readonly _tag: 'None';
}

interface Some<T> {
  readonly _tag: 'Some';
  readonly value: T;
}

export type Option<T> = Some<T> | None;

export function none<T>(): Option<T> {
  return {_tag: 'None'};
}

export function some<T>(val: T): Option<T> {
  return {_tag: 'Some', value: val};
}

export function isSome<T>(opt: Option<T>): boolean {
  return opt._tag === 'Some';
}

export function isNone<T>(opt: Option<T>): boolean {
  return opt._tag === 'None';
}

export function map<T, U>(fn: (val: T) => U): (opt: Option<T>) => Option<U> {
  return (opt) => {
    if (opt._tag === 'Some') {
      return some(fn(opt.value));
    } else {
      return opt as Option<U>;
    }
  };
}

export function flatMap<T, U>(
  fn: (val: T) => Option<U>,
): (opt: Option<T>) => Option<U> {
  return (opt: Option<T>) => {
    if (opt._tag === 'Some') {
      return fn(opt.value);
    } else {
      return opt as Option<U>;
    }
  };
}

export function getOrElse<T>(val: T): (opt: Option<T>) => T {
  return (opt: Option<T>): T => {
    if (opt._tag === 'Some') {
      return opt.value;
    } else {
      return val;
    }
  };
}

export default {some, none, isSome, isNone, map, flatMap, getOrElse};
