import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';

interface ThemeWrapperProps {
    children: ReactElement;
}

export function ThemeWrapper({ children }: ThemeWrapperProps): ReactElement {
    return (
        <ThemeProvider theme={equisoftTheme}>
            {children}
        </ThemeProvider>
    );
}
