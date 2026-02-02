import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const StyledDiv = styled.div<{ $noPadding?: boolean }>`
    background: ${(props) => props.theme.component['card-background-color']};
    border: 1px solid ${(props) => props.theme.component['card-border-color']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 1px 4px 0 ${(props) => props.theme.component['card-box-shadow-color']};
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['card-text-color']};
    margin-bottom: var(--spacing-3x);
    padding: ${({ $noPadding }) => ($noPadding ? '0' : 'var(--spacing-3x) var(--spacing-4x) var(--spacing-4x)')};
`;

interface Props {
    className?: string;
    noPadding?: boolean;
}

export const Card: FunctionComponent<PropsWithChildren<Props>> = ({
    children,
    className,
    noPadding,
    ...otherProps
}) => {
    const dataAttributes = useDataAttributes(otherProps);

    return (
        <StyledDiv
            className={className}
            $noPadding={noPadding}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...dataAttributes}
        >
            {children}
        </StyledDiv>
    );
};

Card.displayName = 'Card';
