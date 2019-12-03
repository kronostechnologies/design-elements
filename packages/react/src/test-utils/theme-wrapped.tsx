import React, { ReactElement } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

export function ThemeWrapped(children: ReactElement): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}
