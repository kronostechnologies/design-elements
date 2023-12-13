export function allSameLetter(text: string): boolean {
    const chars = text.split('');
    return chars.every((letter) => letter === chars[0]);
}
