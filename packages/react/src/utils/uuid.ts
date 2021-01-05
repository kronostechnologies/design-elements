/* eslint-disable no-bitwise */
function v4Replacer(substring: string): string {
    const value = Number(substring);
    const randomValue: number = value ^ globalThis.crypto.getRandomValues(new Uint8Array(1))[0];
    return ((randomValue % 16) >> (value / 4)).toString(16);
}

// Source : https://gist.github.com/jed/982883#gistcomment-1615714
export function v4(): string {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, v4Replacer);
}
