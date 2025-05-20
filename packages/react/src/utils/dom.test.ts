import { getRootElement, sanitizeId } from './dom';

describe('DOM utilities', () => {
    describe('sanitizeId', () => {
        test('replaces spaces with underscores', () => {
            expect(sanitizeId('foo bar')).toBe('foo_bar');
        });
    });

    describe('getRootElement', () => {
        test('should return the root element of a shadow root', () => {
            const shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });

            const rootElement = getRootElement(shadowRoot);

            expect(rootElement.isEqualNode(shadowRoot)).toBe(true);
        });

        test('should return the body when no shadow root is provided', () => {
            const rootElement = getRootElement(null);

            expect(rootElement).toBe(document.body);
        });
    });
});
