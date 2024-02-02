export function allSameLetter(text: string): boolean {
    const chars = text.split('');
    return chars.every((letter) => letter === chars[0]);
}

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
export function stripDiacritics(input: string): string {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
