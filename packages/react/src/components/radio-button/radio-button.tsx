import { ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { VisuallyHidden } from '../visually-hidden/visuallyhidden';
import { useId } from '../../hooks/use-id';

const StyledInput = styled.input<{ disabled?: boolean }>`
    appearance: none;
    background-color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
    border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-border-color'])};
    border-radius: 50%;
    color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
    display: inline-block;
    height: var(--size-1x);
    margin: 0;
    position: relative;
    width: var(--size-1x);
    
    ${(theme) => focus(theme, { selector: '+' })}
     
    &:checked {
        border: 2px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-checked-border-color'])};
        &::after {
            background-color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-checked-background-color'])};
            border-radius: 50%;
            content: '';
            display: block;
            height: var(--size-half);
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: var(--size-half);
        }
    }
        
    &:hover [type="radio"] {
        border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-hover-border-color'] : theme.component['radio-button-hover-border-color'])};
    }
`;

interface StyledLabelProps {
    disabled?: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
    font-size: 0.875rem;
    line-height: 1.5rem;
    margin-left: var(--spacing-1x);
`;

const StyledContainer = styled.div`
    align-items: center;
    display: inline-flex;
    margin-top: var(--spacing-1x);
    position: relative;
`;

interface RadioButtonProps {
    ariaLabel?: string;
    ariaLabelledBy?: string[];
    checked?: boolean;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    externalLabelId?: string;
    id?: string;
    label?: string;
    name?: string;
    value?: string;
    visuallyHidden?: boolean;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
    ariaLabel,
    ariaLabelledBy,
    checked,
    className,
    defaultChecked,
    disabled,
    externalLabelId,
    id,
    label,
    name,
    value,
    visuallyHidden,
    onChange,
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const externalLabel = externalLabelId ? document.getElementById(externalLabelId)?.innerText : '';
    const inputLabel = externalLabelId ? `${label} ${externalLabel}` ?? '' : label;

    return (
        <StyledContainer>
            <StyledInput
                data-testid={`radiobutton-${inputId}`}
                id={inputId}
                type="radio"
                name={name}
                className={className}
                value={value}
                defaultChecked={defaultChecked}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy?.join(' ')}
            />
            {
                label && (
                    <StyledLabel
                        data-testid={`radiobutton-${inputId}_label`}
                        htmlFor={inputId}
                        className={`${className}_label`}
                        disabled={disabled}
                    >
                        {
                            visuallyHidden
                                ? <VisuallyHidden>{inputLabel}</VisuallyHidden>
                                : inputLabel
                        }
                    </StyledLabel>
                )
            }
        </StyledContainer>
    );
};

RadioButton.displayName = 'RadioButton';
