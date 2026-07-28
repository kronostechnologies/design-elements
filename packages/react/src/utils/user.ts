export function getInitialsFromUsername(username: string): string {
    const userNameAlphanumerical = username.normalize('NFD').replace(/[^a-zA-Z0-9\s]/g, '');
    if (userNameAlphanumerical.length === 0) {
        return '';
    }

    const nameParts: string[] = userNameAlphanumerical.split(/\s/);
    if (nameParts.length === 1 && userNameAlphanumerical.length > 0) {
        return userNameAlphanumerical.substring(0, 2).toUpperCase();
    }

    return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
}
