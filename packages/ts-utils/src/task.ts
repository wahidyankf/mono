import {Result, ok, error} from './result';

export type Task<T, E> = Promise<Result<T, E>>;

export function createTask<T, E>(
  fn: () => Promise<T>,
  onError: (err: unknown) => E,
): Task<T, E> {
  return fn()
    .then((x) => ok<T, E>(x))
    .catch((e: unknown) => error<T, E>(onError(e)));
}

export function chainTask<T, E, T1, E1>(
  fn: (t: Result<T, E>) => Result<T1, E1>,
): (t: Task<T, E>) => Task<T1, E1> {
  return (t) => t.then(fn);
}

export default {createTask, chainTask};
