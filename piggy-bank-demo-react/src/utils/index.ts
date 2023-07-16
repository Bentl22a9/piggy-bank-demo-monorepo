export function getSessionStorage<T>(key: string): T | null {
    try {
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null
    } catch (e) {
        console.error(e);
        return null
    }
}

export function setSessionStorage<T>(key: string, item: T) {
    try {
        window && window.sessionStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
        console.error(e);
    }
}