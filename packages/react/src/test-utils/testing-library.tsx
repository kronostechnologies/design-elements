import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DesignSystem, DesignSystemProps } from '../components/design-system';
import { equisoftTheme } from '../theme';

export function renderWithProviders(
    ui: Parameters<typeof render>[0],
    renderOptions: Omit<Parameters<typeof render>[1], 'wrapper'> | undefined = undefined,
    wrapperProps: DesignSystemProps = {},
): ReturnType<typeof render> {
    const {
        isolateStyles,
        language,
        staticDevice,
        theme,
    } = {
        isolateStyles: false,
        language: 'fr',
        theme: equisoftTheme,
        ...wrapperProps,
    };
    return render(
        ui,
        {
            ...renderOptions,
            wrapper: ({ children }) => (
                <MemoryRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
                    <DesignSystem
                        isolateStyles={isolateStyles}
                        language={language}
                        staticDevice={staticDevice}
                        theme={theme}
                    >
                        {children}
                    </DesignSystem>
                </MemoryRouter>
            ),
        },
    );
}
