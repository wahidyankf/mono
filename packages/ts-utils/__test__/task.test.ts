import {adt, result, pipe, Result, task} from '../src';

const {match} = adt;
const {ok, error} = result;
const {createTask, chainTask} = task;

const ERROR_STRING = 'errorString';
const DEFAULT_ERROR_STRING = 'defaultErrorString';

const successfullTask = createTask<number, string>(
  () => new Promise((resolve, _reject) => resolve(1)),
  (e) => (typeof e === 'string' ? e : DEFAULT_ERROR_STRING),
);
const failedTask = createTask<number, string>(
  () => new Promise((_resolve, reject) => reject(ERROR_STRING)),
  (e) => (typeof e === 'string' ? e : DEFAULT_ERROR_STRING),
);
const failedTaskDefault = createTask<number, string>(
  () => new Promise((_resolve, reject) => reject(1)),
  (e) => (typeof e === 'string' ? e : DEFAULT_ERROR_STRING),
);

describe('task could successfully created', () => {
  test('task is an instance of promise', async () => {
    expect(successfullTask).toBeInstanceOf(Promise);
  });
  test('successful task could be created', async () => {
    let aTask = await successfullTask;

    expect(aTask).toEqual(ok(1));
  });
  test('failed task could be created (output value)', async () => {
    let aTask = await failedTask;

    expect(aTask).toEqual(error(ERROR_STRING));
  });
  test('failed task could be created (output default value)', async () => {
    let aTask = await failedTaskDefault;

    expect(aTask).toEqual(error(DEFAULT_ERROR_STRING));
  });
});

describe('chainTask work correctly', () => {
  test('successfull task is chainable', async () => {
    let aTask = await pipe(
      successfullTask,
      chainTask(
        (t): Result<number, string> =>
          match(t)({
            Ok: ({value}) => ok<number, string>(value * 2),
            Error: ({value}) => error<number, string>(value),
          }),
      ),
      chainTask(
        (t): Result<number, string> =>
          match(t)({
            Ok: ({value}) => ok<number, string>(value * 2),
            Error: ({value}) => error<number, string>(value),
          }),
      ),
    );

    expect(aTask).toEqual(ok(4));
  });
  test('failed task is chainable', async () => {
    let aTask = await pipe(
      failedTask,
      chainTask(
        (t): Result<number, string> =>
          match(t)({
            Ok: ({value}) => ok<number, string>(value * 2),
            Error: ({value}) =>
              error<number, string>(value + ' ' + ERROR_STRING),
          }),
      ),
      chainTask(
        (t): Result<number, string> =>
          match(t)({
            Ok: ({value}) => ok<number, string>(value * 2),
            Error: ({value}) =>
              error<number, string>(value + ' ' + ERROR_STRING),
          }),
      ),
    );

    expect(aTask).toEqual(
      error(ERROR_STRING + ' ' + ERROR_STRING + ' ' + ERROR_STRING),
    );
  });
});
