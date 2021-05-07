import {some, none, Option} from '../src/option';
import {ok, error, Result} from '../src/result';
import {match} from '../src/adt';

describe('match works correctly', () => {
  test('match works correctly for option', () => {
    const someString = some('str');
    const someStringRes = match<Option<string>, string>({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(someString);

    const noString: Option<string> = none();
    const noStringRes = match<Option<string>, string>({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('match works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = match<Result<string, string>, string>({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(okString);

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = match<Result<string, string>, string>({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});
