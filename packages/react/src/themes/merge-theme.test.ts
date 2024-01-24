import {
    defaultMain,
    defaultGreys,
    defaultNotifications,
    defaultTokens, defaultRefTokens, defaultAliasTokens,
} from './default-theme';
import { mergeTheme } from './merge-theme';
import { ThemeCustomization } from './tokens/theme';

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
    it('should log an error for for an unresolved token', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => {});

        const token = 'invalid-token';
        const invalidCustomizationWithUnresolvedToken : ThemeCustomization = {
            component: {
                // @ts-ignore-unresolved-token-test-purpose
                'button-primary-background-color': 'invalid-token',
            },
        };

        mergeTheme(invalidCustomizationWithUnresolvedToken);

        expect(consoleSpy).toHaveBeenCalledWith(`Token '${token}' not found in RefTokens or AliasTokens`);
        consoleSpy.mockRestore();
    });
    it('should log an error for self-referencing AliasToken', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => {});

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

        mergeTheme(invalidCustomizationWithSelfReferenced);

        expect(consoleSpy).toHaveBeenCalledWith(`Self-referencing AliasToken detected: '${token}'`);
        consoleSpy.mockRestore();
    });
});
