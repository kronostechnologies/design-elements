import { buildTheme } from './build-theme';
import { equisoftThemeCustomization } from './equisoft';

describe('buildTheme', () => {
    it('renders the equisoft (default) theme', () => {
        expect(buildTheme(equisoftThemeCustomization)).toMatchSnapshot();
    });
});
