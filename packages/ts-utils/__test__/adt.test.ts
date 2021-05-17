import {some, none, Option} from '../src/option';
import {ok, error, Result} from '../src/result';
import {matchI} from '../src/adt';

describe('matchI works correctly', () => {
  test('matchI works correctly for option', () => {
    const someString = some('str');
    const someStringRes = matchI(someString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    const noString: Option<string> = none();
    const noStringRes = matchI(noString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('matchI works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = matchI(okString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = matchI(errorString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});
