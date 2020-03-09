import React, { ComponentProps, ComponentType, ReactElement } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

type ThemeProps = Pick<ComponentProps<typeof ThemeWrapper>, 'children'>;

export function themeProvider(): ComponentType {
    return  ThemeProvider as ComponentType;
}

export function ThemeProvider({ children }: ThemeProps): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}

export function ThemeWrapped(children: ReactElement): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}
