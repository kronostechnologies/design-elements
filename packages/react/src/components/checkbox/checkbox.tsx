import React, { ChangeEvent, forwardRef, FunctionComponent, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon } from '../icon/icon';

const checkboxWidth = '16px';

const iconStyles = css`
    color: ${({ theme }) => theme.greys.white};
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

const CustomCheckbox = styled.span<{ disabled?: boolean }>`
    align-self: center;
    background-color: ${({ disabled, theme }) => (disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.greys['dark-grey'])};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    display: inline-block;
    height: 16px;
    left: 0;
    position: absolute;
    top: 4px;
    width: ${checkboxWidth};

    &:hover {
        border: 1px solid ${({ disabled, theme }) => (disabled ? theme.greys.grey : theme.main['primary-1.1'])};
    }
`;

const StyledInput = styled.input`
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;

    &:checked + ${CustomCheckbox} {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};

        > ${CheckMarkIcon} {
            display: block;
        }
    }

    :indeterminate + ${CustomCheckbox} {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
        border: 1px solid ${({ theme }) => theme.main['primary-1.1']};

        > ${IndeterminateIcon} {
            display: block;
        }
    }

    ${(props) => focus(props, true, `&:focus + ${CustomCheckbox}`)}
`;

interface StyledLabelProps {
    disabled?: boolean;
    hasLabel: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: block;
    line-height: 1.5rem;
    min-height: 24px;
    padding-left: ${({ hasLabel }) => (hasLabel ? 'var(--spacing-3x)' : checkboxWidth)};
    position: relative;
    user-select: none;

    &:not(:first-of-type) {
        margin-top: var(--spacing-1x);
    }
`;

interface Props {
    checked?: boolean;
    className?: string;
    defaultChecked?: boolean,
    disabled?: boolean,
    id?: string,
    indeterminate?: boolean;
    label?: string,
    name?: string,
    value?: string,

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const Checkbox: FunctionComponent<Props> = forwardRef(({
    checked,
    className,
    defaultChecked,
    disabled,
    id,
    indeterminate,
    label,
    name,
    value,
    onChange,
}, ref: Ref<HTMLInputElement | null>) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => checkboxRef.current, [checkboxRef]);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate]);

    return (
        <StyledLabel
            hasLabel={!!label}
            htmlFor={id}
            className={className}
            disabled={disabled}
            key={`${name}-${value}`}
        >
            {label}
            <StyledInput
                id={id}
                ref={checkboxRef}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={onChange}
            />
            <CustomCheckbox disabled={disabled}>
                <CheckMarkIcon />
                <IndeterminateIcon />
            </CustomCheckbox>
        </StyledLabel>
    );
});

Checkbox.displayName = 'Checkbox';
