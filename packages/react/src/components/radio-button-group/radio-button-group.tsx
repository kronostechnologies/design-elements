import { ChangeEvent, useCallback, useRef, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { RadioButton } from '../radio-button/radio-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useId } from '../../hooks/use-id';

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
    margin-bottom: var(--spacing-1x);
    width: fit-content;
`;

const StyledRadioButton = styled(RadioButton)`
    margin-bottom: var(--spacing-1x);
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
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
    inputId?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    content?: {
        element: React.ReactElement;
        maxHeight?: number;
    };
}

interface RadioButtonGroupProps {
    ariaLabel?: string;
    ariaLabelledBy?: string[];
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
    ariaLabel,
    ariaLabelledBy,
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

    const buttonsWithId = buttons.map((button) => ({
        ...button,
        inputId: button.inputId || useId(),
    }));

    return (
        <StyledFieldset className={className}>
            {label && (
                <StyledLegend isMobile={isMobile}>
                    {label}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {tooltip && <StyledTooltip {...tooltip} />}
                </StyledLegend>
            )}
            {buttonsWithId.map((button) => {
                const isExpanded = currentChecked === button.value;

                return (
                    <>
                        <StyledRadioButton
                            key={`${groupName}-${button.value}`}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy?.join(' ')}
                            checked={checkedValue ? checkedValue === button.value : undefined}
                            className={className}
                            data-testid={`${dataTestId}-${button.value}`}
                            defaultChecked={button.defaultChecked}
                            disabled={button.disabled}
                            id={button.inputId}
                            label={button.label}
                            name={groupName}
                            onChange={handleChange}
                            value={button.value}
                        />
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
                    </>
                );
            })}
        </StyledFieldset>
    );
};
