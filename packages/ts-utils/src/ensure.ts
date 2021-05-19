export const [DEFAULT_STRING, DEFAULT_NUMBER, DEFAULT_OBJECT, DEFAULT_ARRAY] = [
  '',
  0,
  {},
  [],
];

export function string(arg: unknown, defaultValue: string = ''): string {
  return typeof arg === 'string' ? arg : defaultValue;
}

export function number(arg: unknown, defaultValue: number = 0): number {
  return typeof arg === 'number' ? arg : defaultValue;
}

export function object(arg: unknown, defaultValue: Object = {}): Object {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg)
    ? arg
    : defaultValue;
}

export function array<T>(arg: unknown, defaultValue: Array<T> = []): Array<T> {
  return Array.isArray(arg) ? arg : defaultValue;
}

export default {
  string,
  number,
  object,
  array,
  DEFAULT_STRING,
  DEFAULT_NUMBER,
  DEFAULT_OBJECT,
  DEFAULT_ARRAY,
};
