import { ChangeEvent, useCallback, useEffect, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { ResolvedTheme } from '../../themes/tokens/theme';
import { focus } from '../../utils/css-state';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledFieldset = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
`;

const StyledLegend = styled.legend<{ isMobile: boolean }>`
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    margin-top: var(--spacing-1x);
    width: fit-content;
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
`;

const RadioWrapper = styled.div``;

const StyledLabel = styled.label`
    ${(props: { theme: ResolvedTheme, disabled?: boolean }) => `
            align-items: center;
            display: flex;
            font-size: 0.875rem;
            line-height: 1.5rem;
            margin-top: var(--spacing-1x);
            position: relative;
            user-select: none;

            input {
                height: var(--size-1x);
                left: 0;
                margin: 0;
                opacity: 0;
                position: absolute;
                width: var(--size-1x);

                &:checked + .radioInput {
                    border: 2px solid ${props.theme.main['primary-1.1']};

                    &::after {
                        background-color: ${props.theme.main['primary-1.1']};
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

const ContentWrapper = styled.div<{ isExpanded: boolean, maxHeight?: number }>(({ isExpanded, maxHeight = 500 }) => `
    overflow: hidden;
    max-height: ${isExpanded ? `${maxHeight}px` : '0'};
    transition: ${isExpanded ? 'max-height 1s ease-in' : 'max-height .5s ease-out'};
`);

interface RadioButtonProps {
    label: string;
    value: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    content?: {
        element: React.ReactElement;
        maxHeight?: number;
    };
}

interface RadioButtonGroupProps {
    className?: string;
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
    buttons,
    className,
    groupName,
    label,
    tooltip,
    onChange,
    checkedValue,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const [currentChecked, setCurrentChecked] = useState(
        buttons.find((button) => (
            checkedValue !== undefined ? checkedValue === button.value : button.defaultChecked
        ))?.value,
    );
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ? dataAttributes['data-testid'] : 'radio-button-group';

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentChecked(event.target.value);
        onChange?.(event);
    }, [onChange, setCurrentChecked]);

    useEffect(() => {
        if (checkedValue !== undefined) {
            setCurrentChecked(checkedValue);
        }
    }, [checkedValue]);

    return (
        <StyledFieldset className={className}>
            {label && (
                <StyledLegend isMobile={isMobile}>
                    {label}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {tooltip && <StyledTooltip {...tooltip} />}
                </StyledLegend>
            )}
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
                            data-testid="content-wrapper"
                            maxHeight={button.content.maxHeight}
                            isExpanded={currentChecked === button.value}
                        >
                            {button.content.element}
                        </ContentWrapper>
                    )}
                </RadioWrapper>
            ))}
        </StyledFieldset>
    );
};
