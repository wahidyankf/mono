import {ok, error, Result} from './result';

export function attempt<T>(
  f: () => T,
  errorMessageKey: string = 'message',
): Result<T, string> {
  try {
    return ok(f());
  } catch (err) {
    const errorMessage = err[errorMessageKey];

    if (errorMessage) {
      return typeof errorMessage === 'string'
        ? error(errorMessage)
        : error(JSON.stringify(err));
    } else {
      return typeof err === 'string' ? error(err) : error(JSON.stringify(err));
    }
  }
}

export default attempt;
