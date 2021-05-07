// Inspired by: https://github.com/nrdlab/pattern-matching-ts/blob/master/src/match.ts

type _Tag<T extends {readonly _tag: string}> = T['_tag'];

// Extract: Constructs a type by extracting from Type all union members that are assignable to Union.
// More about extract:
// https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union

type MatchingType<T, Type extends string> = Extract<T, {readonly _tag: Type}>;

type Match = {
  readonly value?: unknown;
} & {readonly _tag: string};

export function match<T extends Match, R = unknown>(
  pattern: {[K in _Tag<T>]: (x: MatchingType<T, K>) => R},
): (x: T) => R {
  return (x) => pattern[x._tag](x);
}

export default {match};
