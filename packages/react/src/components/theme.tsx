import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

// @ts-ignore
import equisoftTheme from '../themes/equisoft';
// @ts-ignore
export function Theme({ children }): ReactElement {
    return (
        <ThemeProvider theme={equisoftTheme}>
            {children}
        </ThemeProvider>
    );
}
