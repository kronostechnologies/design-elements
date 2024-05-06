import { devConsole } from '../utils/dev-console';
import { buildTheme } from './build-theme';
import { ThemeCustomization } from './theme';
import { defaultRefTokens, defaultAliasTokens } from './tokens';

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

describe('buildTheme', () => {
    it('should build the defaultRefTokens theme with the customization provided', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.ref).toEqual(expectedTheme.ref);
    });

    it('should build the defaultAliasTokens theme with the customization provided', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.alias).toEqual(expectedTheme.alias);
    });

    it('should build the defaultComponentTokens with a customization of a ComponentToken as an AliasToken', () => {
        const builtTheme = buildTheme(customization);

        expect(
            builtTheme.component['button-primary-background-color'],
        ).toEqual(
            expectedTheme.component['button-primary-background-color'],
        );
    });

    it('should build the defaultComponentTokens with a customization of a ComponentToken as a RefToken', () => {
        const builtTheme = buildTheme(customization);

        expect(
            builtTheme.component['button-primary-inverted-background-color'],
        ).toEqual(
            expectedTheme.component['button-primary-inverted-background-color'],
        );
    });

    it('should build the defaultComponentTokens with a partial customization', () => {
        const builtTheme = buildTheme(customization);

        expect(
            builtTheme.component['button-primary-border-color'],
        ).toEqual(
            expectedTheme.component['button-primary-border-color'],
        );
    });

    it('should log an error for for an unresolved token', () => {
        const consoleSpy = jest.spyOn(devConsole, 'error');
        consoleSpy.mockImplementation(() => {});

        const token = 'invalid-token';
        const invalidCustomizationWithUnresolvedToken : ThemeCustomization = {
            component: {
                // @ts-expect-error-unresolved-token-test-purpose
                'button-primary-background-color': 'invalid-token',
            },
        };

        buildTheme(invalidCustomizationWithUnresolvedToken);

        expect(consoleSpy).toHaveBeenCalledWith(`Token '${token}' not found in RefTokens or AliasTokens`);
    });

    it('should log an error for self-referencing AliasToken', () => {
        const consoleSpy = jest.spyOn(devConsole, 'error');
        consoleSpy.mockImplementation(() => {});

        const token = 'default-text-color';
        const invalidCustomizationWithSelfReferenced : ThemeCustomization = {
            alias: {
                // @ts-expect-error-self-referenced-token-test-purpose
                'default-text-color': 'default-text-color',
            },
            component: {
                'button-primary-background-color': 'default-text-color',
            },
        };

        buildTheme(invalidCustomizationWithSelfReferenced);

        expect(consoleSpy).toHaveBeenCalledWith(`Self-referencing AliasToken detected: '${token}'`);
    });
});
