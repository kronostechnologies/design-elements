import { PropsWithChildren, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { HintProps } from './types';

const StyledHint = styled.span<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-hint-text-color']};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

export const Hint: VoidFunctionComponent<PropsWithChildren<HintProps>> = ({
    children, id,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledHint
            data-testid="field-hint"
            id={id}
            $isMobile={isMobile}
        >
            {children}
        </StyledHint>
    );
};
