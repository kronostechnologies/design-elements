import { ChangeEvent, ReactElement, useCallback, useMemo, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Theme } from '../../themes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { Label } from '../label/label';
import { TooltipProps } from '../tooltip/tooltip';

const StyledFieldset = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;

    span > label,
    legend {
        margin-top: var(--spacing-1x);
    }
`;

const RadioWrapper = styled.span``;

const StyledLabel = styled.label`
    ${(props: { theme: Theme, disabled?: boolean }) => `
            ${props.disabled ? '' : 'cursor: pointer;'};
            align-items: center;
            display: flex;
            font-size: 0.875rem;
            line-height: 1.5rem;
            position: relative;
            user-select: none;

            &:not(:first-of-type) {
                margin-top: var(--spacing-1x);
            }

            input {
                height: var(--size-1x);
                left: 0;
                margin: 0;
                opacity: 0;
                position: absolute;
                width: var(--size-1x);

                &:checked + .radioInput {
                    background-color: ${props.theme.main['primary-1.1']};
                    border: 1px solid ${props.theme.main['primary-1.1']};

                    &::after {
                        background-color: ${props.theme.greys.white};
                        border-radius: 50%;
                        content: '';
                        height: var(--size-half);
                        left: 50%;
                        position: absolute;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: var(--size-half);
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
                height: var(--size-1x);
                margin-right: var(--spacing-1x);
                position: relative;
                width: var(--size-1x);
            }

            &:hover .radioInput {
                border: 1px solid ${props.disabled ? props.theme.greys.grey : props.theme.main['primary-1.1']};
            }
            `}
`;

const ContentWrapper = styled.div<{ isExpanded: boolean, height?: number }>(({ isExpanded, height = 500 }) => `
  overflow: hidden;
  max-height: ${isExpanded ? `${height}px` : '0'};
  transition: ${isExpanded ? 'max-height 1s ease-in' : 'max-height .5s ease-out'};
`);

interface RadioButtonProps {
    label: string;
    value: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    content?: {
        render: () => ReactElement;
        height?: number;
    }
}

interface RadioButtonGroupProps {
    id?: string;
    label?: string;
    tooltip?: TooltipProps;
    /** Sets the name property of all buttons */
    groupName: string;
    checkedValue?: string;
    buttons: RadioButtonProps[];

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButtonGroup: VoidFunctionComponent<RadioButtonGroupProps> = ({
    id: providedId,
    buttons,
    groupName,
    label,
    tooltip,
    onChange,
    checkedValue,
    ...otherProps
}) => {
    const [currentChecked, setCurrentChecked] = useState(checkedValue);
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ? dataAttributes['data-testid'] : 'radio-button-group';
    const id = useMemo(() => providedId || uuid(), [providedId]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentChecked(event.target.value);
        if (onChange) onChange(event);
    }, [onChange, setCurrentChecked]);

    return (
        <StyledFieldset>
            {label && <legend><Label forId={id} tooltip={tooltip}>{label}</Label></legend>}
            {buttons.map((button) => (
                <RadioWrapper key={`${groupName}-${button.value}`}>
                    <StyledLabel disabled={button.disabled}>
                        {' '}
                        <input
                            data-testid={`${dataTestId}-${button.value}`}
                            type="radio"
                            name={groupName}
                            value={button.value}
                            checked={checkedValue ? checkedValue === button.value : undefined}
                            defaultChecked={button.defaultChecked}
                            disabled={button.disabled}
                            onChange={handleChange}
                        />
                        <span className="radioInput" />
                        {button.label}
                    </StyledLabel>
                    {button.content && (
                        <ContentWrapper
                            height={button.content.height}
                            isExpanded={currentChecked === button.value}
                        >
                            {button.content.render()}
                        </ContentWrapper>
                    )}
                </RadioWrapper>
            ))}
        </StyledFieldset>
    );
};
