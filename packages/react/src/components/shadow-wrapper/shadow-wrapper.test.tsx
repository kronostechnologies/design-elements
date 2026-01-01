import { renderWithProviders } from '../../test-utils/testing-library';
import { ShadowWrapper } from './shadow-wrapper';

jest.mock('../../styles', () => ({
    mainCss: 'main css',
    useStyle: jest.fn(),
}));

describe('ShadowWrapper', () => {
    it('is div element by default', () => {
        const { container } = renderWithProviders(<ShadowWrapper>Test</ShadowWrapper>);

        expect(container.firstElementChild?.tagName).toBe('DIV');
    });

    it('is set to tagName element', () => {
        const { container } = renderWithProviders(<ShadowWrapper tagName="section">Test</ShadowWrapper>);

        expect(container.firstElementChild?.tagName).toBe('SECTION');
    });

    it('should inject main css', () => {
        const { container } = renderWithProviders(<ShadowWrapper>Test</ShadowWrapper>);

        const shadowRoot = container.firstElementChild?.shadowRoot;
        expect(shadowRoot?.querySelector('style')?.textContent).toEqual('main css');
    });
});
