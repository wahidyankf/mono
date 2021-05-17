import {result, option, adt, Option, Result} from '../src';

const {some, none} = option;
const {ok, error} = result;
const {match, matchI, matchPI} = adt;

describe('match works correctly', () => {
  test('match works correctly for option', () => {
    const someString = some('str');
    const someStringRes = match({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(someString);

    const noString: Option<string> = none();
    const noStringRes = match({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('match works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = match({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(okString);

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = match({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

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

describe('matchPI works correctly', () => {
  test('matchPI works correctly for option', () => {
    const someString = some('str');
    const someStringRes = matchPI(someString)(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    );

    const noString: Option<string> = none();
    const noStringRes = matchPI(noString)(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    );

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('matchPI works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = matchPI(okString)(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    );

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = matchPI(errorString)(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    );

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});
