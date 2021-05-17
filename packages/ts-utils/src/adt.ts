// Adapted from: https://github.com/pfgray/ts-adt
// but changing _type to _tag

/**
 * A sum-type generator. Uses the keys of the passed type as string discriminators
 *
 * @template {string} D - The discriminant field
 * @template {Record<string, {}>} T - The ADT shorthand description
 *
 * ```ts
 * type Option<T> = MakeADT<"_tag", {
 *   none: {},
 *   some: {value: T}
 * }>
 *
 * type These<A, B> = MakeADT<"type", {
 *   left: {left: A},
 *   right: {right: B},
 *   both: {left: A, right: B}
 * }>
 * ```
 */
type MakeADT<D extends string, T extends Record<string, {}>> = {
  [K in keyof T]: Record<D, K> & T[K];
}[keyof T];

/**
 * Describes the match object, where the keys are the discriminant ids, and the values
 * are the functions which handle the value
 */
type MakeMatchObj<D extends string, ADT extends Record<D, string>, Z> = {
  [K in ADT[D]]: (v: MakeADTMember<D, ADT, K>) => Z;
};

/**
 * Unions all the return types of matcher functions
 */
type MakeReturns<
  D extends string,
  ADT extends Record<D, string>,
  M extends MakeMatchObj<D, ADT, unknown>
> = {
  [K in keyof M]: ReturnType<M[K]>;
}[keyof M];

/**
 * Helper type for extracting a member from an ADT
 */
type MakeADTMember<D extends string, ADT, Type extends string> = Extract<
  ADT,
  Record<D, Type>
>;

/**
 * Pattern matching for a sum type defined with ADT
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * pipe(
 *   foo,
 *   makeMatchLast("_tag")({
 *     none: () => 'none',
 *     some: ({value}) => 'some'
 *   })
 * )
 * ```
 */
function makeMatchLast<D extends string>(
  d: D,
): <ADT extends Record<D, string>, M extends MakeMatchObj<D, ADT, unknown>>(
  matchObj: M,
) => (v: ADT) => MakeReturns<D, ADT, M> {
  return (matchObj) => (v) => matchObj[v[d]](v as any) as any;
}

/**
 * Partial pattern matching for a sum type defined with ADT
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * pipe(
 *   foo,
 *   makeMatchPLast("_tag")({
 *     some: ({value}) => 'some'
 *   }, (_option) => 'none')
 * )
 * ```
 */
function makeMatchPLast<D extends string>(
  d: D,
): <
  ADT extends Record<D, string>,
  M extends Partial<MakeMatchObj<D, ADT, unknown>>,
  F extends (rest: Exclude<ADT, Record<D, keyof M>>) => unknown
>(
  matchObj: M,
  otherwise: F,
) => (v: ADT) => MakePartialReturns<D, ADT, M> | ReturnType<F> {
  return (matchObj, otherwise) => (v) =>
    matchObj[v[d]] != null ? (matchObj[v[d]] as any)(v) : (otherwise as any)(v);
}

type UndefineableReturn<
  T extends undefined | ((...args: any) => any)
> = T extends (...args: any) => any ? ReturnType<T> : never;

/**
 * Unions all the return types of matcher functions
 */
type MakePartialReturns<
  D extends string,
  ADT extends Record<D, string>,
  M extends
    | MakeMatchObj<D, ADT, unknown>
    | Partial<MakeMatchObj<D, ADT, unknown>>
> = {
  [K in keyof M]: UndefineableReturn<M[K]>;
}[keyof M];

/**
 * Inverted version of match, useful for better inference in some circumstances
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * makeMatch('_tag')(foo)({
 *   none: () => 'none',
 *   some: ({value}) => 'some'
 * })
 * ```
 */
function makeMatch<D extends string>(
  d: D,
): <ADT extends Record<D, string>>(
  v: ADT,
) => <M extends MakeMatchObj<D, ADT, unknown>>(
  matchObj: M,
) => MakeReturns<D, ADT, M> {
  return (v) => (matchObj) => matchObj[v[d]](v as any) as any;
}

/**
 * Inverted version of {@link makeMatchPLast}, useful for better inference in some circumstances
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * makeMatchP("_tag")(foo)({
 *   some: ({value}) => 'some'
 * }, (_option) => 'none')
 * ```
 */
function makeMatchP<D extends string>(
  d: D,
): <ADT extends Record<D, string>>(
  v: ADT,
) => <
  M extends
    | MakeMatchObj<D, ADT, unknown>
    | Partial<MakeMatchObj<D, ADT, unknown>>,
  F extends (rest: Exclude<ADT, {_tag: keyof M}>) => unknown
>(
  matchObj: M,
  otherwise: F,
) => MakePartialReturns<D, ADT, M> | ReturnType<F> {
  return (v) => (matchObj, otherwise) =>
    matchObj[v[d]] != null
      ? ((matchObj[v[d]] as any)(v) as any)
      : (otherwise as any)(v);
}

/**
 * A sum-type generator. Uses the keys of the passed type as string discriminators
 *
 *
 * ```ts
 * type Option<T> = ADT<{
 *   none: {},
 *   some: {value: T}
 * }>
 *
 * type These<A, B> = ADT<{
 *   left: {left: A},
 *   right: {right: B},
 *   both: {left: A, right: B}
 * }>
 * ```
 */
export type ADT<T extends Record<string, {}>> = MakeADT<'_tag', T>;

/**
 * Pattern matching for a sum type defined with ADT, with
 * discriminant field "_tag"
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * pipe(
 *   foo,
 *   match({
 *     none: () => 'none',
 *     some: ({value}) => 'some'
 *   })
 * )
 * ```
 */
export const matchLast = makeMatchLast('_tag');

/**
 * Inverted version of match, useful for better inference in some circumstances
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * matchI(foo)({
 *   none: () => 'none',
 *   some: ({value}) => 'some'
 * })
 * ```
 */
export const match = makeMatch('_tag');

/**
 * Partial pattern matching for a sum type defined with ADT
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * pipe(
 *   foo,
 *   matchP({
 *     some: ({value}) => 'some'
 *   }, (_option) => 'none')
 * )
 * ```
 */
export const matchPLast = makeMatchPLast('_tag');

/**
 * Inverted version of matchP, useful for better inference in some circumstances
 *
 * ```ts
 * declare const foo: Option<string>
 *
 * matchPI(foo)({
 *   some: ({value}) => 'some'
 * }, (_option) => 'none')
 * ```
 */
export const matchP = makeMatchP('_tag');

export default {match, matchLast, matchP, matchPLast};
