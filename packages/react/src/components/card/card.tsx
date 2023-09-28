import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const StyledDiv = styled.div<{ $noPadding?: boolean }>`
    background: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors['light-grey']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 20%);
    box-sizing: border-box;
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
