import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useStyle } from '../../styles';
import { equisoftTheme, CustomTheme, mergedTheme } from '../../themes';
import { ShadowWrapper } from '../shadow-wrapper/shadow-wrapper';

export interface ThemeWrapperProps {
    /**
     * When true, components are mounted in the Shadow DOM
     * @default false
     */
    isolateStyles?: boolean;
    theme?: CustomTheme;
}

/**
 * @deprecated Use {@link DesignSystem} instead
 */
export const ThemeWrapper: FunctionComponent<PropsWithChildren<ThemeWrapperProps>> = ({
    children,
    isolateStyles = false,
    theme,
}) => {
    const customTheme = mergedTheme({ theme });
    const selectedTheme = customTheme || equisoftTheme;

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
