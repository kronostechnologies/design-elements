import { getInitialsFromUsername } from './user';

describe('getInitialsFromUsername', () => {
    it('should be empty given an empty username', () => {
        const initials = getInitialsFromUsername('');

        expect(initials).toBe('');
    });

    it('should be both first alphanumeric characters from username first and last name '
        + 'given first and last name with non alphanumeric characters', () => {
        const initials = getInitialsFromUsername('_John 123Doe');

        expect(initials).toBe('J1');
    });

    it('should be both first characters from username first and last name'
        + ' given first and last name', () => {
        const initials = getInitialsFromUsername('John Doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters from username first and last name in uppercase '
        + 'given lowercase first and last name', () => {
        const initials = getInitialsFromUsername('john doe');

        expect(initials).toBe('JD');
    });

    it('should be the two first characters in uppercase from the user first name'
        + ' given first name only in lowercase', () => {
        const initials = getInitialsFromUsername('john');

        expect(initials).toBe('JO');
    });

    it('should be both first characters from username first and last name given first, middle and last name', () => {
        const initials = getInitialsFromUsername('John Middle Doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters from username first and last name in uppercase'
        + ' given first, middle and last name in lowercase', () => {
        const initials = getInitialsFromUsername('john middle doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters even with accented characters', () => {
        const initials = getInitialsFromUsername('Édouard Åhlund');

        expect(initials).toBe('EA');
    });

    it('should be the two first characters given a numeric-only username', () => {
        const initials = getInitialsFromUsername('42');

        expect(initials).toBe('42');
    });

    it('should be both first characters given an alphanumeric first and last name', () => {
        const initials = getInitialsFromUsername('Agent 007');

        expect(initials).toBe('A0');
    });

    it('should be the two first characters given a single numeric word', () => {
        const initials = getInitialsFromUsername('7');

        expect(initials).toBe('7');
    });
});
