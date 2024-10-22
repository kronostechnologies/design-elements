import { devConsole } from '../utils/dev-console';
import { buildTheme } from './build-theme';
import { ThemeCustomization } from './theme';
import { defaultRefTokens } from './tokens';

const customization: ThemeCustomization = {
    ref: {
        'color-brand-05': 'red',
        'color-brand-20': 'green',
        'color-neutral-02': 'blue',
    },
    alias: {
        'color-content': 'color-brand-05',
        'color-content-subtle': 'color-brand-20',
    },
    component: {
        'button-primary-background-color': 'color-neutral-02',
        'button-primary-inverted-background-color': 'color-brand-20',
        'focus-inside-border-color': 'color-content-subtle',
    },
};

const expectedTheme = {
    ref: {
        ...defaultRefTokens,
        'color-brand-05': 'red',
        'color-brand-20': 'green',
        'color-neutral-02': 'blue',
    },
};
describe('buildTheme', () => {
    it('should build the defaultRefTokens theme with the customization provided', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.ref).toEqual(expectedTheme.ref);
    });

    it('should build the defaultAliasTokens theme with the customization provided', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.alias).toMatchSnapshot();
    });

    it('should build the defaultComponentTokens with a customization of a ComponentToken as an AliasToken', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.component['focus-inside-border-color']).toEqual('green');
    });

    it('should build the defaultComponentTokens with a customization of a ComponentToken as a RefToken', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.component['button-primary-inverted-background-color']).toEqual('green');
    });

    it('should build the defaultComponentTokens with a partial customization', () => {
        const builtTheme = buildTheme(customization);

        expect(builtTheme.component['button-primary-border-color']).toEqual('#006296');
    });

    it('should log an error for for an unresolved token', () => {
        const consoleSpy = jest.spyOn(devConsole, 'error');
        consoleSpy.mockImplementation(() => undefined);

        const token = 'invalid-token';
        const invalidCustomizationWithUnresolvedToken: ThemeCustomization = {
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
        consoleSpy.mockImplementation(() => undefined);

        const token = 'color-content';
        const invalidCustomizationWithSelfReferenced: ThemeCustomization = {
            alias: {
                // @ts-expect-error-self-referenced-token-test-purpose
                'color-content': 'color-content',
            },
            component: {
                'button-primary-background-color': 'color-content',
            },
        };

        buildTheme(invalidCustomizationWithSelfReferenced);

        expect(consoleSpy).toHaveBeenCalledWith(`Self-referencing AliasToken detected: '${token}'`);
    });
});
