import { ShadowWrapper } from '@design-elements/components/shadow-wrapper/shadow-wrapper';
import { useStyle } from '@design-elements/styles';
import React, { ReactElement, ReactNode } from 'react';
import { ThemeProvider, ThemeProviderProps } from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';

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
    tokens: {
        'focus-box-shadow': string,
        'focus-border-box-shadow': string,
        'focus-border-box-shadow-inset': string,
        'focus-border': string,
    };
}

interface ThemeWrapperProps extends Omit<ThemeProviderProps<Theme>, 'theme'> {
    isolateStyles?: boolean;
    theme?: Theme;
}

export function ThemeWrapper({ children, isolateStyles = false, theme }: ThemeWrapperProps): ReactElement {
    let selectedTheme = theme;
    if (selectedTheme) {
        if (Object.entries(selectedTheme).length === 0 && selectedTheme.constructor === Object) {
            selectedTheme = equisoftTheme;
        }
    } else {
        selectedTheme = equisoftTheme;
    }

    let content: ReactNode;
    if (isolateStyles) {
        content = <ShadowWrapper>{children}</ShadowWrapper>;
    } else {
        content = children;
    }

    useStyle(isolateStyles);

    return (
        <ThemeProvider theme={selectedTheme}>
            {content}
        </ThemeProvider>
    );
}
