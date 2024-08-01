import { PropsWithChildren, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { BaseLabelProps } from '../../label/label';

const StyledHint = styled.label<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-hint-text-color']};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

export interface HintProps extends BaseLabelProps {
    htmlFor: string;
}

const Hint: VoidFunctionComponent<PropsWithChildren<HintProps>> = ({
    children, id, htmlFor,
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledHint
            data-testid="invalid-field"
            aria-live="polite"
            htmlFor={htmlFor}
            id={id}
            $isMobile={isMobile}
            role="alert"
        >
            {children}
        </StyledHint>
    );
};

export { Hint };
