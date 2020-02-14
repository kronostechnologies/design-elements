import { mount, ReactWrapper, render } from 'enzyme';
import React, { Component, ComponentProps, ReactElement } from 'react';
import { equisoftTheme, ThemeWrapper } from '..';

export function mountWithTheme<C extends Component, P = C['props'], S = C['state']>(
    component: ReactElement<P>,
): ReactWrapper<P, S, C> {
    return mount(component, {
        wrappingComponent: ThemeWrapper,
        wrappingComponentProps: { theme: equisoftTheme },
    });
}

function ThemeProvider({ children }: Pick<ComponentProps<typeof ThemeWrapper>, 'children'>): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}

export function renderWithTheme(
    component: ReactElement,
): Cheerio {
    return render(<ThemeProvider>{component}</ThemeProvider>);
}

export function ThemeWrapped(children: ReactElement): ReactElement {
    return (
        <ThemeWrapper theme={equisoftTheme}>
            {children}
        </ThemeWrapper>
    );
}
