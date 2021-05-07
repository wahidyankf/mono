type _Tag<T extends {readonly _tag: string}> = T['_tag'];

type MatchingType<T, Type extends string> = Extract<T, {readonly _tag: Type}>;

type Match = {
  readonly value?: unknown;
} & {readonly _tag: string};

export function match<T extends Match, R = unknown>(
  matchKFunc: {[K in _Tag<T>]: (x: MatchingType<T, K>) => R},
): (x: T) => R {
  return (x) => matchKFunc[x._tag](x);
}

export default {match};
