import { generateComponentClasses } from './generate-component-classes';

describe('generateComponentClasses', () => {
    const keys = ['root', 'label', 'icon'];

    it('should generate correct class names for a given component', () => {
        const componentName = 'Button';
        const expectedClasses = {
            root: 'eds-Button-root',
            label: 'eds-Button-label',
            icon: 'eds-Button-icon',
        };

        const result = generateComponentClasses(componentName, keys);

        expect(result).toEqual(expectedClasses);
    });

    it('should handle empty component name', () => {
        const componentName = '';
        const expectedClasses = {
            root: 'eds-root',
            label: 'eds-label',
            icon: 'eds-icon',
        };

        const result = generateComponentClasses(componentName, keys);

        expect(result).toEqual(expectedClasses);
    });
});
