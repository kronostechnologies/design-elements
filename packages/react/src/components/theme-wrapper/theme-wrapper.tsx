import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';

interface ThemeWrapperProps {
    children: ReactElement;
    theme?: Theme;
}

export function ThemeWrapper({ children, theme }: ThemeWrapperProps): ReactElement {
    let selectedTheme = theme;
    if (selectedTheme) {
        if (Object.entries(selectedTheme).length === 0 && selectedTheme.constructor === Object) {
            selectedTheme = equisoftTheme;
        }
    } else {
        selectedTheme = equisoftTheme;
    }
    return (
        <ThemeProvider theme={selectedTheme}>
            {children}
        </ThemeProvider>
    );
}
