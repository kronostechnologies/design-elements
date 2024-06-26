import { ChangeEvent, useCallback, useRef, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { focus } from '../../utils/css-state';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledFieldset = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
`;

const StyledLegend = styled.legend<{ isMobile: boolean }>`
    color: ${({ theme }) => theme.component['radio-button-group-legend-text-color']};
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

const StyledLabel = styled.label<{ disabled?: boolean }>`
    align-items: center;
    display: inline-flex;
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

        ${(theme) => focus(theme, { selector: '+ .radioInput' })}

        &:checked + .radioInput {
            border: 2px solid ${({ theme }) => theme.component['radio-button-checked-border-color']};

            &::after {
                background-color: ${({ theme }) => theme.component['radio-button-checked-background-color']};
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
    }

    .radioInput {
        background-color: ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-background-color'] : theme.component['radio-button-background-color'])};
        border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-border-color'] : theme.component['radio-button-border-color'])};
        border-radius: 50%;
        box-sizing: border-box;
        display: inline-block;
        height: var(--size-1x);
        margin-right: var(--spacing-1x);
        position: relative;
        width: var(--size-1x);
    }

    &:hover .radioInput {
        border: 1px solid ${({ theme, disabled }) => (disabled ? theme.component['radio-button-disabled-hover-border-color'] : theme.component['radio-button-hover-border-color'])};
    }
`;

const ContentWrapper = styled.div<{ $isExpanded: boolean, $maxHeight?: number, $transitionDuration: number }>(({ $isExpanded, $maxHeight = 500, $transitionDuration }) => `
    overflow: hidden;
    max-height: ${$isExpanded ? `${$maxHeight}px` : '0'};
    transition: max-height ${$transitionDuration}ms ease-in-out;
`);

const InnerContent = styled.div<{ $isExpanded: boolean, $transitionStarted: boolean }>(({ $isExpanded, $transitionStarted }) => `
    display: ${$isExpanded || $transitionStarted ? 'block' : 'none'};
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
    /** Duration in milliseconds */
    transitionDuration?: number;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButtonGroup: VoidFunctionComponent<RadioButtonGroupProps> = ({
    buttons,
    className,
    groupName,
    label,
    tooltip,
    onChange,
    transitionDuration = 500,
    checkedValue,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const [currentChecked, setCurrentChecked] = useState(
        buttons.find((button) => (
            checkedValue !== undefined ? checkedValue === button.value : button.defaultChecked
        ))?.value,
    );
    const prevChecked = useRef(currentChecked);
    const [transitionStarted, setTransitionStarted] = useState(false);
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ? dataAttributes['data-testid'] : 'radio-button-group';

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentChecked(event.target.value);
        onChange?.(event);
    }, [onChange, setCurrentChecked]);

    if (checkedValue !== undefined && checkedValue !== prevChecked.current) {
        setCurrentChecked(checkedValue);
        prevChecked.current = checkedValue;
    }

    if (currentChecked !== prevChecked.current) {
        const willHaveTransition = buttons.find((b) => b.value === prevChecked.current)?.content
            || buttons.find((b) => b.value === currentChecked)?.content;

        if (willHaveTransition) {
            setTransitionStarted(true);
        }
        prevChecked.current = currentChecked;
    }

    const handleTransitionEnd = useCallback(() => {
        setTransitionStarted(false);
    }, []);

    return (
        <StyledFieldset className={className}>
            {label && (
                <StyledLegend isMobile={isMobile}>
                    {label}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {tooltip && <StyledTooltip {...tooltip} />}
                </StyledLegend>
            )}
            {buttons.map((button) => {
                const isExpanded = currentChecked === button.value;

                return (
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
                                $maxHeight={button.content.maxHeight}
                                $isExpanded={isExpanded}
                                $transitionDuration={transitionDuration}
                                onTransitionEnd={handleTransitionEnd}
                            >
                                <InnerContent
                                    $isExpanded={isExpanded}
                                    $transitionStarted={transitionStarted}
                                >
                                    {button.content.element}
                                </InnerContent>
                            </ContentWrapper>
                        )}
                    </RadioWrapper>
                );
            })}
        </StyledFieldset>
    );
};
