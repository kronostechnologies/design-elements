import { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div<{ $noPadding?: boolean }>`
    background: ${(props) => props.theme.greys.white};
    border: 1px solid ${(props) => props.theme.greys['light-grey']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    margin-bottom: var(--spacing-3x);
    padding: ${({ $noPadding }) => ($noPadding ? '0' : 'var(--spacing-3x) var(--spacing-4x) var(--spacing-4x)')};
`;

interface Props {
    className?: string;
    noPadding?: boolean;
}

export const Card: FunctionComponent<Props> = ({ children, className, noPadding }) => (
    <StyledDiv className={className} $noPadding={noPadding}>
        {children}
    </StyledDiv>
);
