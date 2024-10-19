export function IsBrowser() {
    return window !== undefined && document !== undefined && navigator !== undefined;
}