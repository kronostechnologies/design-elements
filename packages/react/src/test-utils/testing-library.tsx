import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DesignSystem, DesignSystemProps } from '../components/design-system';
import { equisoftThemeCustomization } from '../theme';

export function renderWithProviders(
    ui: Parameters<typeof render>[0],
    renderOptions: Omit<Parameters<typeof render>[1], 'wrapper'> | undefined = undefined,
    wrapperProps: DesignSystemProps = {},
): ReturnType<typeof render> {
    const {
        isolateStyles,
        language,
        staticDevice,
        themeCustomization,
    } = {
        isolateStyles: false,
        language: 'fr',
        themeCustomization: equisoftThemeCustomization,
        ...wrapperProps,
    };
    return render(
        ui,
        {
            ...renderOptions,
            wrapper: ({ children }) => (
                <MemoryRouter>
                    <DesignSystem
                        isolateStyles={isolateStyles}
                        language={language}
                        staticDevice={staticDevice}
                        themeCustomization={themeCustomization}
                    >
                        {children}
                    </DesignSystem>
                </MemoryRouter>
            ),
        },
    );
}
