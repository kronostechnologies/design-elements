import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';

export interface Theme {
    main: {
        'primary-1.1': string,
        'primary-1.2': string,
        'primary-1.3': string,
        'primary-2': string,
        'primary-3': string,
        'secondary-4.1': string,
        'secondary-4.2': string,
        'secondary-4.3': string,
    };
    greys: {
        'white': string,
        'colored-white': string,
        'light-grey': string,
        'grey': string,
        'mid-grey': string,
        'dark-grey': string,
        'black': string,
    };
    notifications: {
        'success-1.1': string,
        'success-1.2': string,
        'success-1.3': string,
        'error-2.1': string,
        'error-2.2': string,
        'alert-3.1': string,
        'alert-3.2': string,
        'alert-3.3': string,
    };
}

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
