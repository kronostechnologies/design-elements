import { ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import { RadioInput } from '../radio-button/radio-input';
import { useId } from '../../hooks/use-id';

const StyledLabel = styled.label`
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-left: var(--spacing-1x);
`;

const StyledContainer = styled.div`
    align-items: flex-start;
    display: flex;
    position: relative;
`;

const StyledRadioInput = styled(RadioInput)`
    margin-top: var(--spacing-quarter);
`;

interface RadioButtonProps {
    ariaLabel?: string;
    ariaLabelledBy?: string[];
    checked?: boolean;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    label?: string;
    name?: string;
    value?: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
    ariaLabel,
    ariaLabelledBy,
    checked,
    className,
    defaultChecked,
    disabled,
    id,
    label,
    name,
    value,
    onChange,
}) => {
    const inputId = useId(id);

    return (
        <StyledContainer className={className}>
            <StyledRadioInput
                data-testid={`radiobutton-${inputId}`}
                id={inputId}
                name={name}
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
                    >
                        {label}
                    </StyledLabel>
                )
            }
        </StyledContainer>
    );
};

RadioButton.displayName = 'RadioButton';
