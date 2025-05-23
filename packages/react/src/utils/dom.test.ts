import { getRootElement, sanitizeId, findNearestRelativeParent } from './dom';

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

    describe('findNearestRelativeParent', () => {
        let parent: HTMLElement;
        let child: HTMLElement;
        let grandchild: HTMLElement;

        beforeEach(() => {
            // Create a DOM structure for testing
            parent = document.createElement('div');
            child = document.createElement('div');
            grandchild = document.createElement('div');

            parent.appendChild(child);
            child.appendChild(grandchild);
            document.body.appendChild(parent);
        });

        afterEach(() => {
            document.body.replaceChildren();
        });

        it('should return the nearest relative parent', () => {
            parent.style.position = 'relative';

            expect(findNearestRelativeParent(grandchild, document)).toBe(parent);
        });

        it('should return null if no relative parent is found', () => {
            expect(findNearestRelativeParent(grandchild, document)).toBe(null);
        });

        it('should return the direct parent if it is relative', () => {
            child.style.position = 'relative';

            expect(findNearestRelativeParent(grandchild, document)).toBe(child);
        });

        it('should ignore the element itself if it is relative', () => {
            grandchild.style.position = 'relative';

            expect(findNearestRelativeParent(grandchild, document)).toBe(null);
        });
    });
});
