export function ensureString(arg: unknown, defaultValue: string = ''): string {
  return typeof arg === 'string' ? arg : defaultValue;
}

export function ensureNumber(arg: unknown, defaultValue: number = 0): number {
  return typeof arg === 'number' ? arg : defaultValue;
}

export function ensureObject(arg: unknown, defaultValue: Object = {}): Object {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg)
    ? arg
    : defaultValue;
}

export function ensureArray<T>(
  arg: unknown,
  defaultValue: Array<T> = [],
): Array<T> {
  return Array.isArray(arg) ? arg : defaultValue;
}

export default {ensureString, ensureNumber, ensureObject, ensureArray};
