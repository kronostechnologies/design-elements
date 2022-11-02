import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyle } from '../../styles';
import { equisoftTheme, Theme } from '../../themes';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';

export interface ThemeWrapperProps {
    /**
     * When true, components are mounted in the Shadow DOM
     * @default false
     */
    isolateStyles?: boolean;
    theme?: Theme;
}

/**
 * @deprecated Use {@link DesignSystem} instead
 */
export const ThemeWrapper: FunctionComponent<PropsWithChildren<ThemeWrapperProps>> = ({
    children,
    isolateStyles = false,
    theme,
}) => {
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
