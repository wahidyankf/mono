import {result, option, adt, Option, Result} from '../src';

const {some, none} = option;
const {ok, error} = result;
const {match, matchLast, matchP, matchPLast} = adt;

describe('match works correctly', () => {
  test('match works correctly for option', () => {
    const someString = some('str');
    const someStringRes = match(someString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    const noString: Option<string> = none();
    const noStringRes = match(noString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('match works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = match(okString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = match(errorString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

describe('matchLast works correctly', () => {
  test('matchLast works correctly for option', () => {
    const someString = some('str');
    const someStringRes = matchLast({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(someString);

    const noString: Option<string> = none();
    const noStringRes = matchLast({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('matchLast works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = matchLast({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(okString);

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = matchLast({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

describe('matchP works correctly', () => {
  test('matchP works correctly for option', () => {
    const someString = some('str');
    const someStringRes = matchP(someString)(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    );

    const noString: Option<string> = none();
    const noStringRes = matchP(noString)(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    );

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('matchP works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = matchP(okString)(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    );

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = matchP(errorString)(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    );

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

describe('matchPLast works correctly', () => {
  test('matchPLast works correctly for option', () => {
    const someString = some('str');
    const someStringRes = matchPLast(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    )(someString);

    const noString: Option<string> = none();
    const noStringRes = matchPLast(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    )(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('matchPLast works correctly for result', () => {
    const okString: Result<string, string> = ok('ok string');
    const okStringRes = matchPLast(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    )(okString);

    const errorString: Result<string, string> = error('error string');
    const errorStringRes = matchPLast(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    )(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});
