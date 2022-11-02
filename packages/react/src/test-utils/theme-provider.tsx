import { ComponentProps, ComponentType, FunctionComponent, PropsWithChildren } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

type ThemeProps = Pick<ComponentProps<typeof ThemeWrapper>, 'children'>;

export const ThemeProvider: FunctionComponent<PropsWithChildren<ThemeProps>> = ({ children }) => (
    <ThemeWrapper theme={equisoftTheme}>
        {children}
    </ThemeWrapper>
);

export function themeProvider(): ComponentType {
    return ThemeProvider as ComponentType;
}
