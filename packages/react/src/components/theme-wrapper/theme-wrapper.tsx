import { ShadowWrapper } from '@design-elements/components/shadow-wrapper/shadow-wrapper';
import { useStyle } from '@design-elements/styles';
import { Theme } from '@design-elements/themes/theme';
import React, { ReactElement, ReactNode } from 'react';
import { ThemeProvider, ThemeProviderProps } from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';

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
