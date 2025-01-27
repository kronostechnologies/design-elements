import { devConsole } from '../utils/dev-console';
import { buildTheme } from './build-theme';
import { ThemeCustomization } from './theme';
import { defaultRefTokens } from './tokens';

describe('buildTheme', () => {
    test('custom ref tokens override defaults', () => {
        const colorName = 'crimson-red';
        const theme = buildTheme({
            ref: {
                'color-brand-50': colorName,
            },
        });

        expect(theme.ref['color-brand-50']).toEqual(colorName);
    });

    test('custom alias tokens override defaults', () => {
        const refTokenName = 'color-white';
        const theme = buildTheme({
            alias: {
                'color-content': refTokenName,
            },
        });

        expect(theme.alias['color-content']).toEqual(defaultRefTokens[refTokenName]);
    });

    test('custom component tokens override defaults', () => {
        const refTokenName = 'color-white';
        const theme = buildTheme({
            component: {
                'text-input-text-color': refTokenName,
            },
        });

        expect(theme.component['text-input-text-color']).toEqual(defaultRefTokens[refTokenName]);
    });

    test('contextual values are used when the correct context is active', () => {
        const customization: ThemeCustomization = {
            ref: {
                'font-size-350': '0.875rem',
                'font-size-400': '1rem',
            },
            alias: {
                'text-body-medium-font-size': 'font-size-350',
                'text-body-medium-font-size:mobile': 'font-size-400',
            },
        };

        const theme = buildTheme(customization, ['mobile']);

        expect(theme.alias['text-body-medium-font-size']).toEqual(customization.ref?.['font-size-400']);
    });

    test('contextual values are not used outside of the correct context', () => {
        const customization: ThemeCustomization = {
            ref: {
                'font-size-350': '0.875rem',
                'font-size-400': '1rem',
            },
            alias: {
                'text-body-medium-font-size': 'font-size-350',
                'text-body-medium-font-size:mobile': 'font-size-400',
            },
        };

        const theme = buildTheme(customization);

        expect(theme.alias['text-body-medium-font-size']).toEqual(customization.ref?.['font-size-350']);
    });

    test('contextual values are discarded when not used', () => {
        const customization: ThemeCustomization = {
            ref: {
                'font-size-350': '0.875rem',
                'font-size-400': '1rem',
            },
            alias: {
                'text-body-medium-font-size': 'font-size-350',
                'text-body-medium-font-size:mobile': 'font-size-400',
            },
        };

        const theme = buildTheme(customization);

        // @ts-expect-error-discarded-token-test
        expect(theme.alias['text-body-medium-font-size:mobile']).toBeUndefined();
    });

    test('component token values are resolved through aliases', () => {
        const customization: ThemeCustomization = {
            ref: {
                'color-brand-50': 'cadmium-yellow',
            },
            alias: {
                'color-content': 'color-brand-50',
                'color-content-brand': 'color-content',
            },
            component: {
                'button-primary-background-color': 'color-content-brand',
            },
        };

        const theme = buildTheme(customization);

        expect(theme.component['button-primary-background-color']).toEqual('cadmium-yellow');
    });

    test('logs an error with an invalid token', () => {
        const consoleSpy = jest.spyOn(devConsole, 'error');
        consoleSpy.mockImplementation(() => undefined);

        buildTheme({
            component: {
                // @ts-expect-error-invalid-token-test
                'button-primary-background-color': 'invalid-token',
            },
        });

        expect(consoleSpy).toHaveBeenCalled();
    });

    test('logs an error with self-referencing token', () => {
        const consoleSpy = jest.spyOn(devConsole, 'error');
        consoleSpy.mockImplementation(() => undefined);

        buildTheme({
            alias: {
                // @ts-expect-error-self-referencing-test
                'color-content': 'color-content',
            },
            component: {
                'button-primary-background-color': 'color-content',
            },
        });

        expect(consoleSpy).toHaveBeenCalled();
    });
});
