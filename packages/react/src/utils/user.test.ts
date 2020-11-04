import { getInitialsFromUsername } from '@design-elements/utils/user';

describe('getInitialsFromUsername', () => {
    it('should be empty given an empty username', () => {
        const initials = getInitialsFromUsername('');

        expect(initials).toBe('');
    });

    it('should be both first alpha characters from username first and last name given first and last name with non alpha characters', () => {
        const initials = getInitialsFromUsername('_John 123Doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters from username first and last name given first and last name', () => {
        const initials = getInitialsFromUsername('John Doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters from username first and last name in uppercase given lowercase first and last name', () => {
        const initials = getInitialsFromUsername('john doe');

        expect(initials).toBe('JD');
    });

    // tslint:disable-next-line:max-line-length
    it('should be the two first characters in uppercase from the user first name given first name only in lowercase', () => {
        const initials = getInitialsFromUsername('john');

        expect(initials).toBe('JO');
    });

    it('should be both first characters from username first and last name given first, middle and last name', () => {
        const initials = getInitialsFromUsername('John Middle Doe');

        expect(initials).toBe('JD');
    });

    it('should be both first characters from username first and last name in uppercase given first, middle and last name in lowercase', () => {
        const initials = getInitialsFromUsername('john middle doe');

        expect(initials).toBe('JD');
    });
});
