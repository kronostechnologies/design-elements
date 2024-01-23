import {
    defaultMain,
    defaultGreys,
    defaultNotifications,
    defaultTokens, defaultRefTokens, defaultAliasTokens,
} from '../default-theme';
import { mergeTheme } from './merge-theme';
import { ThemeCustomization } from './theme';

const customization : ThemeCustomization = {
    ref: {
        'color-brand-05': 'red',
        'color-brand-20': 'green',
    },
    alias: {
        'button-color-secondary': 'color-brand-05',
        'interaction-color': 'button-color-secondary',
    },
    component: {
        'button-primary-background-color': 'button-color-secondary',
        'button-primary-inverted-background-color': 'color-brand-20',
    },
};

const expectedTheme = {
    main: defaultMain,
    greys: defaultGreys,
    notifications: defaultNotifications,
    tokens: defaultTokens,
    ref: {
        ...defaultRefTokens,
        'color-brand-05': 'red',
        'color-brand-20': 'green',
    },
    alias: {
        ...defaultAliasTokens,
        'button-color-secondary': 'color-brand-05',
        'interaction-color': 'button-color-secondary',
    },
    component: {
        'button-primary-background-color': 'red',
        'button-primary-inverted-background-color': 'green',
        'button-primary-border-color': '#006296',
    },
};

describe('mergeTheme', () => {
    it('should merge the defaultRefTokens theme with the customization provided', () => {
        const mergedTheme = mergeTheme(customization);

        expect(mergedTheme.ref).toEqual(expectedTheme.ref);
    });
    it('should merge the defaultAliasTokens theme with the customization provided', () => {
        const mergedTheme = mergeTheme(customization);

        expect(mergedTheme.alias).toEqual(expectedTheme.alias);
    });
    it('should merge the defaultComponentTokens with a customization of a ComponentToken as an AliasToken', () => {
        const mergedTheme = mergeTheme(customization);

        expect(
            mergedTheme.component['button-primary-background-color'],
        ).toEqual(
            expectedTheme.component['button-primary-background-color'],
        );
    });
    it('should merge the defaultComponentTokens with a customization of a ComponentToken as a RefToken', () => {
        const mergedTheme = mergeTheme(customization);

        expect(
            mergedTheme.component['button-primary-inverted-background-color'],
        ).toEqual(
            expectedTheme.component['button-primary-inverted-background-color'],
        );
    });
    it('should merge the defaultComponentTokens with a partial customization', () => {
        const mergedTheme = mergeTheme(customization);

        expect(
            mergedTheme.component['button-primary-border-color'],
        ).toEqual(
            expectedTheme.component['button-primary-border-color'],
        );
    });
    it('should throw an error for an unresolved token', () => {
        const token = 'invalid-token';
        const invalidCustomizationWithUnresolvedToken : ThemeCustomization = {
            component: {
                // @ts-ignore-unresolved-token-test-purpose
                'button-primary-background-color': 'invalid-token',
            },
        };
        expect(() => {
            // @ts-ignore-unresolved-token-test-purpose
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            mergeTheme(invalidCustomizationWithUnresolvedToken).component[token];
        }).toThrowError(`Token '${token}' not found in RefTokens or AliasTokens`);
    });
    it('should throw an error for a self-referenced AliasToken', () => {
        const token = 'button-color-secondary';
        const invalidCustomizationWithSelfReferenced : ThemeCustomization = {
            alias: {
                // @ts-ignore-self-referenced-token-test-purpose
                'button-color-secondary': 'button-color-secondary',
            },
            component: {
                'button-primary-background-color': 'button-color-secondary',
            },
        };

        expect(() => {
            // @ts-ignore-unresolved-token-test-purpose
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            mergeTheme(invalidCustomizationWithSelfReferenced).component[token];
        }).toThrowError(`Self-referencing AliasToken detected: '${token}'`);
    });
});
