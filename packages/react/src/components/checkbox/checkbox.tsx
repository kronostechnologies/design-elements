import {
    ChangeEvent,
    forwardRef,
    FunctionComponent,
    PropsWithChildren,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
import styled, { css } from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon } from '../icon/icon';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const checkboxWidth = 'var(--size-1x)';

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
    height: var(--size-1x);
    left: 0;
    margin-right: var(--spacing-1x);
    position: relative;
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
    align-items: center;
    display: flex;
    line-height: 1.5rem;
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

export const Checkbox: FunctionComponent<PropsWithChildren<Props>> = forwardRef(({
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
    ...otherProps
}, ref: Ref<HTMLInputElement | null>) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => checkboxRef.current, [checkboxRef]);
    const dataAttributes = useDataAttributes(otherProps);

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
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            <CustomCheckbox disabled={disabled}>
                <CheckMarkIcon />
                <IndeterminateIcon />
            </CustomCheckbox>
            {label}
        </StyledLabel>
    );
});

Checkbox.displayName = 'Checkbox';
