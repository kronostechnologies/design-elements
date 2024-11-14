import {
    ChangeEvent,
    forwardRef,
    FunctionComponent,
    PropsWithChildren,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef, useState,
} from 'react';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon } from '../icon/icon';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { ResolvedTheme } from '../../themes/theme';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { v4 as uuid } from '../../utils/uuid';

const checkboxWidth = 'var(--size-1x)';

const iconStyles = css`
    color: ${({ theme }) => theme.component['checkbox-checked-icon-color']};
    display: none;
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
`;

const CheckMarkIcon = styled(Icon).attrs({ name: 'check' })`
    ${iconStyles}
`;

const IndeterminateIcon = styled(Icon).attrs({ name: 'minus' })`
    ${iconStyles}
`;

interface CheckboxStyleProps {
    disabled?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
}

function getBorderColor({ disabled, theme, $valid }: CheckboxStyleProps): string {
    if (disabled) {
        return theme.component['checkbox-disabled-border-color'];
    }

    if (!$valid) {
        return theme.component['checkbox-error-border-color'];
    }

    return theme.component['checkbox-unchecked-border-color'];
}

const CustomCheckbox = styled.span<CheckboxStyleProps>`
    background-color: ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-background-color'] : theme.component['checkbox-unchecked-background-color'])};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: inline-block;
    flex-shrink: 0;
    height: var(--size-1x);
    left: 0;
    margin: var(--spacing-half) var(--spacing-1x);
    position: relative;
    width: ${checkboxWidth};

    &:hover {
        background-color: ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-background-color'] : theme.component['checkbox-hover-background-color'])};
        border: 1px solid ${({ disabled, theme }) => (disabled ? theme.component['checkbox-disabled-border-color'] : theme.component['checkbox-hover-border-color'])};
    }
`;

const StyledInput = styled.input`
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;

    &:checked + ${CustomCheckbox} {
        background-color: ${({ theme }) => theme.component['checkbox-checked-background-color']};
        border: 1px solid ${({ theme }) => theme.component['checkbox-checked-border-color']};

        > ${CheckMarkIcon} {
            display: block;
        }
    }

    &:indeterminate + ${CustomCheckbox} {
        background-color: ${({ theme }) => theme.component['checkbox-checked-background-color']};
        border: 1px solid ${({ theme }) => theme.component['checkbox-checked-border-color']};

        > ${IndeterminateIcon} {
            display: block;
        }
    }

    ${({ theme }) => focus({ theme }, { selector: `+ ${CustomCheckbox}` })};
`;

interface StyledLabelProps {
    disabled?: boolean;
    hasLabel: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
    align-items: flex-start;
    display: flex;
    line-height: 1.5rem;
    position: relative;
    user-select: none;

    &:not(:first-of-type) {
        margin-top: var(--spacing-1x);
    }
`;

const StyledIcon = styled(Icon)`
    align-self: center;
    display: flex;
    margin-right: var(--spacing-base);
`;

const ValidationErrorAlert = styled.div`
    align-items: flex-start;
    color: ${({ theme }) => theme.component['checkbox-error-border-color']};
    display: flex;
    margin-left: var(--spacing-1x);
    padding-bottom: var(--spacing-1x);
`;

export interface CheckboxProps {
    checked?: boolean;
    className?: string;
    defaultChecked?: boolean,
    disabled?: boolean,
    id?: string,
    indeterminate?: boolean;
    isInGroup?: boolean;
    label?: string,
    name?: string,
    required?: boolean,
    valid?: boolean,
    validationErrorMessage?: string;
    value?: string,

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const Checkbox: FunctionComponent<PropsWithChildren<CheckboxProps>> = forwardRef(({
    checked,
    className,
    defaultChecked,
    disabled,
    id,
    indeterminate,
    isInGroup = false,
    label,
    name,
    required,
    valid = true,
    validationErrorMessage,
    value,
    onChange,
    ...otherProps
}, ref: Ref<HTMLInputElement | null>) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('checkbox');
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [isChecked, setIsChecked] = useState<boolean | undefined>(checked || false);
    const validationAlertId = `${id || uuid()}_validationAlert`;

    useImperativeHandle(ref, () => checkboxRef.current, [checkboxRef]);
    const dataAttributes = useDataAttributes(otherProps);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
            checkboxRef.current.checked = checked || false;
        }
    }, [indeterminate, checked]);

    return (
        <>
            {
                required && !valid && !isChecked && !isInGroup
                && (
                <ValidationErrorAlert id={validationAlertId}>
                    <StyledIcon name="alertOctagon" size={isMobile ? '24' : '16'} />
                    {validationErrorMessage || t('validationErrorMessage')}
                </ValidationErrorAlert>
                )
            }
            <StyledLabel
                hasLabel={!!label}
                htmlFor={id}
                className={className}
                disabled={disabled}
                key={`${name}-${value}`}
            >
                <StyledInput
                    id={id}
                    aria-labelledby={(required && !valid && !isChecked) ? validationAlertId : ''}
                    aria-invalid={!valid && !isChecked}
                    ref={checkboxRef}
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    required={required}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setIsChecked(!!checkboxRef.current?.checked);
                        onChange?.(event);
                    }}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <CustomCheckbox disabled={disabled} $valid={required ? valid && (isChecked || false) : valid}>
                    <CheckMarkIcon />
                    <IndeterminateIcon />
                </CustomCheckbox>
                {label}
            </StyledLabel>
        </>
    );
});

Checkbox.displayName = 'Checkbox';
