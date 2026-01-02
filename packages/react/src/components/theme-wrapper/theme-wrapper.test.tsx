import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/testing-library';
import { buildTheme, ThemeCustomization } from '../../themes';
import { Button } from '../buttons';

describe('Theme Wrapper', () => {
    it('returns component with default theme', () => {
        const { asFragment } = renderWithProviders(
            <Button buttonType="primary" />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('returns component with custom theme', () => {
        const themeCustomization: ThemeCustomization = {
            ref: {
                'color-brand-50': '#00874E',
            },
            component: {
                'button-primary-background-color': 'color-brand-50',
            },
        };

        const builtTheme = buildTheme(themeCustomization);

        const { asFragment } = renderWithProviders(
            <Button buttonType="primary" />,
            undefined,
            { theme: builtTheme },
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should not use ShadowWrapper by default', () => {
        const { container } = renderWithProviders(<div data-testid="test-child">Child</div>);

        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(container.firstElementChild!.shadowRoot).toBeNull();
    });

    it('should use ShadowWrapper when styles are isolated', () => {
        const { container } = renderWithProviders(
            <div data-testid="test-child">Child</div>,
            undefined,
            { isolateStyles: true },
        );

        expect(screen.queryByTestId('test-child')).not.toBeInTheDocument();

        const shadowHost = container.firstElementChild;
        expect(shadowHost?.shadowRoot).toBeTruthy();
        expect(shadowHost?.shadowRoot?.textContent).toContain('Child');
    });
});
