import { renderHook } from '@testing-library/react';
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import fonts from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./body.scss';
import { useMainCss } from './style-loader';

describe('useMainCss', () => {
    it('should inject css when styles are not isolated', () => {
        renderHook(useMainCss, { initialProps: false });

        expect(fonts.use).toHaveBeenCalled();
    });

    it('should remove css on unmount when styles are not isolated', () => {
        const { unmount } = renderHook(useMainCss, { initialProps: false });

        unmount();

        expect(fonts.unuse).toHaveBeenCalled();
    });

    it('should not inject css when styles are isolated', () => {
        renderHook(useMainCss, { initialProps: true });

        expect(fonts.use).not.toHaveBeenCalled();
    });
});
