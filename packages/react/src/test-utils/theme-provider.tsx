import { ComponentProps, ComponentType, FunctionComponent, ReactElement } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

type ThemeProps = Pick<ComponentProps<typeof ThemeWrapper>, 'children'>;

export const ThemeProvider: FunctionComponent<ThemeProps> = ({ children }: ThemeProps): ReactElement => (
    <ThemeWrapper theme={equisoftTheme}>
        {children}
    </ThemeWrapper>
);

export function themeProvider(): ComponentType {
    return ThemeProvider as ComponentType;
}
