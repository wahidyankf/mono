import pipe from '../src/pipe';

function add1(x) {
  return x + 1;
}

function addS(s) {
  return s + 'x';
}

describe('pipe works correctly', () => {
  test('pipe 1 works correctly', () => {
    expect(pipe(0, add1)).toEqual(1);
    expect(pipe('', addS)).toEqual('s');
  });
  test('pipe 2 works correctly', () => {
    expect(pipe(0, add1, add1)).toEqual(2);
    expect(pipe('', addS, addS)).toEqual('ss');
  });
  test('pipe 3 works correctly', () => {
    expect(pipe(0, add1, add1, add1)).toEqual(3);
    expect(pipe('', addS, addS, addS)).toEqual('sss');
  });
  test('pipe 4 works correctly', () => {
    expect(pipe(0, add1, add1, add1, add1)).toEqual(4);
    expect(pipe('', addS, addS, addS, addS)).toEqual('ssss');
  });
  test('pipe 5 works correctly', () => {
    expect(pipe(0, add1, add1, add1, add1, add1)).toEqual(5);
    expect(pipe('', addS, addS, addS, addS, addS)).toEqual('sssss');
  });
  test('pipe 6 works correctly', () => {
    expect(pipe(0, add1, add1, add1, add1, add1, add1)).toEqual(6);
    expect(pipe('', addS, addS, addS, addS, addS, addS)).toEqual('ssssss');
  });
  test('pipe 7 works correctly', () => {
    expect(pipe(0, add1, add1, add1, add1, add1, add1, add1)).toEqual(7);
    expect(pipe('', addS, addS, addS, addS, addS, addS, addS)).toEqual(
      'sssssss',
    );
  });
  test('pipe 8 works correctly', () => {
    expect(pipe(0, add1, add1, add1, add1, add1, add1, add1, add1)).toEqual(8);
    expect(pipe('', addS, addS, addS, addS, addS, addS, addS, addS)).toEqual(
      'ssssssss',
    );
  });
  test('pipe 9 works correctly', () => {
    expect(
      pipe(0, add1, add1, add1, add1, add1, add1, add1, add1, add1),
    ).toEqual(9);
    expect(
      pipe('', addS, addS, addS, addS, addS, addS, addS, addS, addS),
    ).toEqual('sssssssss');
  });
  test('pipe 10 works correctly', () => {
    expect(
      pipe(0, add1, add1, add1, add1, add1, add1, add1, add1, add1, add1),
    ).toEqual(10);
    expect(
      pipe('', addS, addS, addS, addS, addS, addS, addS, addS, addS, addS),
    ).toEqual('ssssssssss');
  });
  test('pipe 11 works correctly', () => {
    expect(
      pipe(0, add1, add1, add1, add1, add1, add1, add1, add1, add1, add1, add1),
    ).toEqual(11);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('sssssssssss');
  });
  test('pipe 12 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(12);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('ssssssssssss');
  });
  test('pipe 13 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(13);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('sssssssssssss');
  });
  test('pipe 14 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(14);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('ssssssssssssss');
  });
  test('pipe 15 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(15);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('sssssssssssssss');
  });
  test('pipe 16 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(16);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('ssssssssssssssss');
  });
  test('pipe 17 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(17);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('sssssssssssssssss');
  });
  test('pipe 18 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(18);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('ssssssssssssssssss');
  });
  test('pipe 19 works correctly', () => {
    expect(
      pipe(
        0,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
        add1,
      ),
    ).toEqual(19);
    expect(
      pipe(
        '',
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
        addS,
      ),
    ).toEqual('sssssssssssssssssss');
  });
});
