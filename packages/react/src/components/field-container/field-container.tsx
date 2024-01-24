import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes/tokens/theme';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { InvalidField } from '../feedbacks/invalid-field';
import { Label } from '../label/label';
import { TooltipProps } from '../tooltip/tooltip';

interface StyledDivProps {
    theme: Theme;
    hasLabel: boolean;
    hasHint: boolean;
    valid: boolean;
    noMargin?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
    margin: ${({ noMargin }) => (noMargin ? '0' : '0 0 var(--spacing-3x)')};

    input,
    select,
    textarea {
        border-color: ${({ theme, valid }) => (valid ? theme.greys['dark-grey'] : theme.notifications['alert-2.1'])};
    }

    &:focus {
        border-color: ${({ theme, valid }) => (valid ? theme.main['primary-1.1'] : theme.notifications['alert-2.1'])};
    }

    > :nth-child(${({ hasLabel, hasHint, valid }) => (hasLabel ? 1 : 0) + (hasHint ? 1 : 0) + (!valid ? 1 : 0)}) {
        margin-bottom: var(--spacing-half);
    }
`;

const StyledHint = styled.span<{ isMobile: boolean }>`
    color: ${(props) => props.theme.greys['dark-grey']};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
`;

export interface FieldContainerProps {
    className?: string;
    fieldId: string;
    hint?: string;
    label?: string;
    noInvalidFieldIcon?: boolean;
    noMargin?: boolean;
    required?: boolean;
    tooltip?: TooltipProps;
    valid: boolean;
    validationErrorMessage: string;
}

export const FieldContainer: FunctionComponent<PropsWithChildren<FieldContainerProps>> = ({
    children,
    className,
    fieldId,
    hint,
    label,
    noInvalidFieldIcon,
    noMargin,
    required,
    tooltip,
    valid,
    validationErrorMessage,
    ...props
}) => {
    const { isMobile } = useDeviceContext();

    return (
        <StyledDiv
            className={className}
            noMargin={noMargin}
            hasLabel={!!label}
            hasHint={!!hint}
            valid={valid}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {label && <Label id={`${fieldId}_label`} forId={fieldId} tooltip={tooltip} required={required}>{label}</Label>}
            {hint && <StyledHint id={`${fieldId}_hint`} isMobile={isMobile}>{hint}</StyledHint>}
            {!valid && (
                <InvalidField
                    data-testid="text-input-error-msg"
                    controlId={fieldId}
                    feedbackMsg={validationErrorMessage}
                    noIcon={noInvalidFieldIcon}
                />
            )}
            {children}
        </StyledDiv>
    );
};
