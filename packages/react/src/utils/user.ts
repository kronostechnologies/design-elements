export function getInitialsFromUsername(username: string): string {
    const usernameWithoutNonAlphaCharacters = username.normalize('NFD').replace(/[^a-zA-Z\s]/g, '');
    if (usernameWithoutNonAlphaCharacters.length === 0) {
        return '';
    }

    const nameParts: string[] = usernameWithoutNonAlphaCharacters.split(/\s/);
    if (nameParts.length === 1 && usernameWithoutNonAlphaCharacters.length > 0) {
        return usernameWithoutNonAlphaCharacters.substr(0, 2).toUpperCase();
    }

    return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
}
