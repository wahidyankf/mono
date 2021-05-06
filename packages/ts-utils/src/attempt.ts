import {ok, error, Result} from './result';

export function attempt<T>(f: () => T): Result<T, string> {
  try {
    return ok(f());
  } catch (e) {
    if (e.message) {
      return typeof e.message === 'string'
        ? error(e.message)
        : error(JSON.stringify(e));
    } else {
      return typeof e === 'string' ? error(e) : error(JSON.stringify(e));
    }
  }
}

export default attempt;
