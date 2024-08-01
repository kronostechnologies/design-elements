import { forwardRef, Fragment, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field/context';
import { focus } from '../../utils/css-state';
import { InputProps } from './types';

const StyledWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Adornment = styled.div<{ position: 'left' | 'right' }>`
    color: ${({ theme }) => theme.component['text-input-placeholder-text-color']};
    position: absolute;
    ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')}
    display: flex;
    align-items: center;
    height: 100%;
`;

const StyledInput = styled.input<{ $isMobile: boolean; $hasLeftAdornment: boolean; $hasRightAdornment: boolean }>`
    background: ${({ theme }) => theme.component['text-input-background-color']};
    border: 1px solid;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['text-input-text-color']};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.02875rem' : '0.015rem')};
    line-height: 1.5rem;
    margin: 0;
    min-height: var(--size-2x);
    outline: none;
    padding-bottom: 0;
    padding-top: 0;
    padding-right: ${({ $hasRightAdornment }) => ($hasRightAdornment ? 'var(--spacing-4x)' : 'var(--spacing-1x)')};
    padding-left: ${({ $hasLeftAdornment }) => ($hasLeftAdornment ? 'var(--spacing-4x)' : 'var(--spacing-1x)')};
    width: 100%;

    &::placeholder {
        color: ${({ theme }) => theme.component['text-input-placeholder-text-color']};
    }

    &:valid,
    &[aria-invalid='false'] {
        border-color: ${({ theme }) => theme.component['text-input-border-color']};
    }

    &[aria-invalid='true'] {
        border-color: ${({ theme }) => theme.component['text-input-error-border-color']};
    }

    &:disabled,
    &[aria-disabled='true'] {
        background-color: ${({ theme }) => theme.component['text-input-disabled-background-color']};
        border-color: ${({ theme }) => theme.component['text-input-disabled-border-color']};
        color: ${({ theme }) => theme.component['text-input-disabled-text-color']};

        &,
        &::placeholder {
            color: ${({ theme }) => theme.component['text-input-placeholder-disabled-text-color']};
        }
    }

    ${({ theme }) => focus({ theme })};
`;

export const Input = forwardRef(({
    id: providedId,
    valid: providedValid = true,
    required: providedRequired = false,
    disabled: providedDisabled = false,
    leftAdornment,
    rightAdornment,
    ...otherProps
}: InputProps, ref: Ref<HTMLInputElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const inputId = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);
    const WrapperComponent = (leftAdornment || rightAdornment) ? StyledWrapper : Fragment;

    const {
        id = inputId,
        valid = providedValid,
        required = providedRequired,
        disabled = providedDisabled,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
    } = useFieldControlContext(otherProps);

    return (
        <WrapperComponent>
            {leftAdornment && <Adornment position="left">{leftAdornment}</Adornment>}
            <StyledInput
                data-testid="input"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabel ? undefined : ariaLabelledby}
                aria-describedby={ariaDescribedby}
                aria-disabled={disabled}
                aria-invalid={valid ? 'false' : 'true'}
                id={id}
                disabled={disabled}
                required={required}
                ref={ref}
                $isMobile={isMobile}
                $hasLeftAdornment={!!leftAdornment}
                $hasRightAdornment={!!rightAdornment}
                {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            {rightAdornment && <Adornment position="right">{rightAdornment}</Adornment>}
        </WrapperComponent>
    );
});

Input.displayName = 'Input';
