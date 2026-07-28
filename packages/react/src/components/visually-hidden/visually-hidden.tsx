import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { hiddenStyle } from './visually-hidden.style';

const Hidden = styled.span`
    ${hiddenStyle}
`;

export type VisuallyHiddenProps = PropsWithChildren<{}>;

export const VisuallyHidden: FunctionComponent<VisuallyHiddenProps> = ({ children }) => (
    <Hidden aria-hidden="false">
        {children}
    </Hidden>
);

VisuallyHidden.displayName = 'VisuallyHidden';
