import { buildTheme } from './build-theme';
import { equisoftThemeCustomization } from './equisoft';

describe('buildTheme', () => {
    test('equisoft (default) theme snapshot', () => {
        expect(buildTheme(equisoftThemeCustomization)).toMatchSnapshot();
    });
});
