import {ADT} from './adt';

export type Option<T> = ADT<{Some: {value: T}; None: {}}>;

export function none<T>(): Option<T> {
  return {_tag: 'None'};
}

export function some<T>(value: T): Option<T> {
  return {_tag: 'Some', value};
}

export function isSome<T>(option: Option<T>): boolean {
  return option._tag === 'Some';
}

export function isNone<T>(option: Option<T>): boolean {
  return option._tag === 'None';
}

export function getOrElse<T>(value: T): (option: Option<T>) => T {
  return (option: Option<T>): T => {
    if (option._tag === 'Some') {
      return option.value;
    } else {
      return value;
    }
  };
}

export function map<T, U>(
  fn: (value: T) => U,
): (option: Option<T>) => Option<U> {
  return (option) => {
    if (option._tag === 'Some') {
      return some(fn(option.value));
    } else {
      return option as Option<U>;
    }
  };
}

export function flatMap<T, U>(
  fn: (value: T) => Option<U>,
): (option: Option<T>) => Option<U> {
  return (option: Option<T>) => {
    if (option._tag === 'Some') {
      return fn(option.value);
    } else {
      return option as Option<U>;
    }
  };
}

export default {some, none, isSome, isNone, map, flatMap, getOrElse};
