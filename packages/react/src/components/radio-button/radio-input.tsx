import { ChangeEvent, FocusEvent, forwardRef, Ref } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';

const getDotSvgDataUrl = (color: string): string => {
    const svg = `
        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="4" fill="${color}"/>
        </svg>`;
    return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
};

const StyledInput = styled.input<{ disabled?: boolean; isMobile?: boolean }>`
    appearance: none;
    background-color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
    border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-border-color'])};
    border-radius: 50%;
    color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
    display: inline-block;
    flex-shrink: 0;
    height: var(--size-1x);
    margin: 0;
    position: relative;
    width: var(--size-1x);

    ${focus}

    &:checked {
        background-image: ${({ theme, disabled }) => getDotSvgDataUrl(disabled ? theme.component['radio-button-disabled-checked-dot-color'] : theme.component['radio-button-checked-dot-color'])};
        background-position: center;
        background-repeat: no-repeat;
        border: 2px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-checked-border-color'])};
    }

    &:disabled {
        & + label {
            color: ${({ theme }) => theme.component['radio-button-disabled-label-color']};
        }
    }

    &:hover {
        &:checked:not(:disabled) {
            border: 1px solid ${({ theme }) => theme.component['radio-button-hover-border-color']};
        }

        &:not(:checked) {
            border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-hover-border-color'] : theme.component['radio-button-hover-border-color'])};
        }
    }
`;

export interface RadioInputProps {
    ariaLabel?: string;
    ariaLabelledBy?: string[];
    checked?: boolean;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    required?: boolean;
    value?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;
    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(({
    ariaLabel,
    ariaLabelledBy,
    checked,
    className,
    defaultChecked,
    disabled,
    id,
    name,
    value,
    required,
    onBlur,
    onChange,
}: RadioInputProps, ref: Ref<HTMLInputElement>) => {
    const inputId = useId(id);

    return (
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
            onBlur={onBlur}
            onChange={onChange}
            required={required}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy?.join(' ')}
            ref={ref}
        />
    );
});

RadioInput.displayName = 'RadioInput';
