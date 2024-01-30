import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyle } from '../../styles';
import { equisoftTheme } from '../../themes';
import { mergeTheme } from '../../themes/merge-theme';
import { ThemeCustomization } from '../../themes/theme';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';

export interface ThemeWrapperProps {
    /**
     * When true, components are mounted in the Shadow DOM
     * @default false
     */
    isolateStyles?: boolean;
    theme?: ThemeCustomization;
}

/**
 * @deprecated Use {@link DesignSystem} instead
 */
export const ThemeWrapper: FunctionComponent<PropsWithChildren<ThemeWrapperProps>> = ({
    children,
    isolateStyles = false,
    theme,
}) => {
    const selectedTheme = mergeTheme(theme || equisoftTheme);

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
