import { buildTheme } from './build-theme';

describe('buildTheme', () => {
    test('equisoft (default) theme snapshot', () => {
        expect(buildTheme({})).toMatchSnapshot();
    });
});
