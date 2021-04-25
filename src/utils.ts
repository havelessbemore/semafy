export function isFunction(fn: unknown): fn is Function {
    return typeof fn === 'function';
}

export function isRecord(obj: unknown): obj is Record<string, unknown> {
    const type = typeof obj;
    return obj != null && (type === 'object' || type === 'function');
}
