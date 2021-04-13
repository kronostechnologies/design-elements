import React, { FunctionComponent, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyle } from '../../styles';
import { equisoftTheme, Theme } from '../../themes';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';

export interface ThemeWrapperProps {
    isolateStyles?: boolean;
    theme?: Theme;
}

export const ThemeWrapper: FunctionComponent<ThemeWrapperProps> = ({ children, isolateStyles = false, theme }) => {
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
};
