const letterOrNumber = /^[\p{L}\p{N}]$/iu;

export function isLetterOrNumber(text: string): boolean {
    return letterOrNumber.test(text);
}
