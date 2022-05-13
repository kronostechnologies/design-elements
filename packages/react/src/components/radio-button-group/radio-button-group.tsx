import { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';

const Legend = styled.legend`
    font-size: 0.75rem;
    line-height: 1.25rem;
    margin-bottom: var(--spacing-1x);
    padding: 0;
`;

const StyledLabel = styled.label`
    ${(props: { theme: Theme, disabled?: boolean }) => `
            ${props.disabled ? '' : 'cursor: pointer;'};
            display: block;
            font-size: 0.875rem;
            line-height: 1.5rem;
            padding-left: var(--spacing-3x);
            position: relative;
            user-select: none;

            &:not(:first-of-type) {
                margin-top: var(--spacing-1x);
            }

            input {
                height: 16px;
                left: 0;
                margin: 0;
                opacity: 0;
                position: absolute;
                top: 2px;
                width: 16px;

                &:checked + .radioInput {
                    background-color: ${props.theme.main['primary-1.1']};
                    border: 1px solid ${props.theme.main['primary-1.1']};

                    &::after {
                        background-color: ${props.theme.greys.white};
                        border-radius: 50%;
                        content: "";
                        height: 8px;
                        left: 50%;
                        position: absolute;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 8px;
                    }
                }

                ${focus(props, true, '&:focus + .radioInput')}
            }

            .radioInput {
                background-color: ${props.disabled ? props.theme.greys['light-grey'] : props.theme.greys.white};
                border: 1px solid ${props.disabled ? props.theme.greys.grey : props.theme.greys['dark-grey']};
                border-radius: 50%;
                box-sizing: border-box;
                display: inline-block;
                height: 16px;
                left: 0;
                margin-top: var(--spacing-half);
                position: absolute;
                top: 0;
                width: 16px;
            }

            &:hover .radioInput {
                border: 1px solid ${props.disabled ? props.theme.greys.grey : props.theme.main['primary-1.1']};
            }
            `}
`;

interface RadioButtonGroupProps {
    label?: string;
    /** Sets the name property of all buttons */
    groupName: string;
    checkedValue?: string;
    buttons: {
        label: string,
        value: string,
        defaultChecked?: boolean,
        disabled?: boolean,
    }[];

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export function RadioButtonGroup(
    {
        buttons,
        groupName,
        label,
        onChange,
        checkedValue,
        ...otherProps
    }: RadioButtonGroupProps,
): ReactElement {
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ? dataAttributes['data-testid'] : 'radio-button-group';

    return (
        <>
            {label && <Legend>{label}</Legend>}
            {buttons.map((button) => (
                <StyledLabel
                    disabled={button.disabled}
                    key={`${groupName}-${button.value}`}
                >
                    {' '}
                    {button.label}
                    <input
                        data-testid={`${dataTestId}-${button.value}`}
                        type="radio"
                        name={groupName}
                        value={button.value}
                        checked={checkedValue ? checkedValue === button.value : undefined}
                        defaultChecked={button.defaultChecked}
                        disabled={button.disabled}
                        onChange={onChange}
                    />
                    <span className="radioInput" />
                </StyledLabel>
            ))}
        </>
    );
}
