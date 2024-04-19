export function removeNullProperties(obj: Object) {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
}