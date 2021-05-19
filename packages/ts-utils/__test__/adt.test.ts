import {result, option, adt, Option, Result} from '../src';

const {match, unsafeMatchLast, matchP, unsafeMatchPLast} = adt;

describe('match works correctly', () => {
  test('match works correctly for option', () => {
    const someString = option.some('str');
    const someStringRes = match(someString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    const noString: Option<string> = option.none();
    const noStringRes = match(noString)({
      Some: ({value}) => value,
      None: () => 'nothing',
    });

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('match works correctly for result', () => {
    const okString: Result<string, string> = result.ok('ok string');
    const okStringRes = match(okString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    const errorString: Result<string, string> = result.error('error string');
    const errorStringRes = match(errorString)({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    });

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

describe('unsafeMatchLast works correctly', () => {
  test('unsafeMatchLast works correctly for option', () => {
    const someString = option.some('str');
    const someStringRes = unsafeMatchLast({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(someString);

    const noString: Option<string> = option.none();
    const noStringRes = unsafeMatchLast({
      Some: ({value}) => value,
      None: () => 'nothing',
    })(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('unsafeMatchLast works correctly for result', () => {
    const okString: Result<string, string> = result.ok('ok string');
    const okStringRes = unsafeMatchLast({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(okString);

    const errorString: Result<string, string> = result.error('error string');
    const errorStringRes = unsafeMatchLast({
      Ok: ({value}) => value,
      Error: ({value}) => value,
    })(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});

describe('matchP works correctly', () => {
  test('matchP works correctly for option', () => {
    const someString = option.some('str');
    const someStringRes = matchP(someString)(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    );

    const noString: Option<string> = option.none();
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
    const okString: Result<string, string> = result.ok('ok string');
    const okStringRes = matchP(okString)(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    );

    const errorString: Result<string, string> = result.error('error string');
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

describe('unsafeMatchPLast works correctly', () => {
  test('unsafeMatchPLast works correctly for option', () => {
    const someString = option.some('str');
    const someStringRes = unsafeMatchPLast(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    )(someString);

    const noString: Option<string> = option.none();
    const noStringRes = unsafeMatchPLast(
      {
        Some: ({value}) => value,
      },
      (_option) => 'nothing',
    )(noString);

    expect(someStringRes).toEqual('str');
    expect(noStringRes).toEqual('nothing');
  });

  test('unsafeMatchPLast works correctly for result', () => {
    const okString: Result<string, string> = result.ok('ok string');
    const okStringRes = unsafeMatchPLast(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    )(okString);

    const errorString: Result<string, string> = result.error('error string');
    const errorStringRes = unsafeMatchPLast(
      {
        Error: ({value}) => value,
      },
      (_result) => 'ok string',
    )(errorString);

    expect(okStringRes).toEqual('ok string');
    expect(errorStringRes).toEqual('error string');
  });
});
