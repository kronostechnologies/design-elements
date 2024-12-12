function hasKey<K extends PropertyKey>(obj: unknown, key: K): obj is { [key in K]: unknown } {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

export function isEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) {
        return true;
    }

    if (obj1 === null || obj2 === null || typeof obj1 === 'undefined' || typeof obj2 === 'undefined') {
        return false;
    }

    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    if (typeof obj1 !== 'object') {
        return obj1 === obj2;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!isEqual(obj1[i], obj2[i])) {
                return false;
            }
        }
        return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length || !keys1.every((key) => keys2.includes(key))) {
        return false;
    }
    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        if (!hasKey(obj2, key) || !hasKey(obj1, key) || !isEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
}
