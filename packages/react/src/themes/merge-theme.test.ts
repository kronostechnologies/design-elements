import {
    defaultMain,
    defaultGreys,
    defaultNotifications,
    defaultTokens,
} from './tokens/legacy-tokens';
import { mergeTheme } from './merge-theme';
import { ThemeCustomization } from './theme';
import { defaultRefTokens, defaultComponentTokens, defaultAliasTokens } from './tokens';

const legacyThemeCustomization: ThemeCustomization = {
    main: {
        'primary-1.1': '#013F78',
        'primary-1.2': '#D5E8FA',
        'primary-1.3': '#2D3145',
        'primary-1.4': '#E4ECF4',
        'primary-2': '#013F78',
        'secondary-4.1': '#CBA239',
        'secondary-4.2': '#8D6705',
        'secondary-4.3': '#3F474C',
    },
    greys: {
        white: '#FFF',
        'colored-white': '#FAFAFA',
        'light-grey': '#F1F2F2',
        grey: '#D9DDE2',
        'mid-grey': '#9CA7B4',
        'dark-grey': '#57666E',
        black: '#000',
    },
};

const expectedLegacyTheme = {
    main: {
        ...defaultMain,
        'primary-1.1': '#013F78',
        'primary-1.2': '#D5E8FA',
        'primary-1.3': '#2D3145',
        'primary-1.4': '#E4ECF4',
        'primary-2': '#013F78',
        'secondary-4.1': '#CBA239',
        'secondary-4.2': '#8D6705',
        'secondary-4.3': '#3F474C',
    },
    greys: {
        ...defaultGreys,
        white: '#FFF',
        'colored-white': '#FAFAFA',
        'light-grey': '#F1F2F2',
        grey: '#D9DDE2',
        'mid-grey': '#9CA7B4',
        'dark-grey': '#57666E',
        black: '#000',
    },
    notifications: defaultNotifications,
    tokens: defaultTokens,
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};

const customization : ThemeCustomization = {
    ref: {
        'color-brand-05': 'red',
        'color-brand-20': 'green',
        'color-neutral-02': 'blue',
    },
    alias: {
        'default-text-color': 'color-brand-05',
        'alternate-text-color': 'color-brand-20',
    },
    component: {
        'button-primary-background-color': 'color-neutral-02',
        'button-primary-inverted-background-color': 'color-brand-20',
        'focus-inside-border-color': 'alternate-text-color',
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
        'color-neutral-02': 'blue',
    },
    alias: {
        ...defaultAliasTokens,
        'default-text-color': 'color-brand-05',
        'alternate-text-color': 'color-brand-20',
    },
    component: {
        'button-primary-background-color': 'blue',
        'button-primary-inverted-background-color': 'green',
        'button-focus-border': 'red',
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
    it('should merge the default legacy theme with a legacy customization provided', () => {
        const mergedTheme = mergeTheme(legacyThemeCustomization);

        expect(mergedTheme.main).toEqual(expectedLegacyTheme.main);
        expect(mergedTheme.greys).toEqual(expectedLegacyTheme.greys);
        expect(mergedTheme.notifications).toEqual(expectedLegacyTheme.notifications);
        expect(mergedTheme.tokens).toEqual(expectedLegacyTheme.tokens);
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

        const token = 'default-text-color';
        const invalidCustomizationWithSelfReferenced : ThemeCustomization = {
            alias: {
                // @ts-ignore-self-referenced-token-test-purpose
                'default-text-color': 'default-text-color',
            },
            component: {
                'button-primary-background-color': 'default-text-color',
            },
        };

        mergeTheme(invalidCustomizationWithSelfReferenced);

        expect(consoleSpy).toHaveBeenCalledWith(`Self-referencing AliasToken detected: '${token}'`);
        consoleSpy.mockRestore();
    });
});
