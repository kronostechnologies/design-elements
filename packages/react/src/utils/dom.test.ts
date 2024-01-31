import { sanitizeId } from './dom';

describe('DOM utilities', () => {
    describe('sanitizeId', () => {
        test('replaces spaces with underscores', () => {
            expect(sanitizeId('foo bar')).toBe('foo_bar');
        });
    });
});
