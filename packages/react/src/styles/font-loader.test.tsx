import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import fonts from '!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./_fonts.scss';
import { useFont } from './font-loader';

jest.mock('!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./_fonts.scss');

describe('useFont', () => {
    it('should inject fonts in header when styles are isolated', () => {
        renderHook(useFont, { initialProps: true });

        expect(fonts.use).toBeCalled();
    });

    it('should remove fonts on unmount when styles are isolated', () => {
        const { unmount } = renderHook(useFont, { initialProps: true });

        unmount();

        expect(fonts.unuse).toBeCalled();
    });

    it('should not inject fonts when styles are not isolated', () => {
        renderHook(useFont, { initialProps: false });

        expect(fonts.use).not.toBeCalled();
    });
});
