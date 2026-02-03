import { ChangeEvent, type FC, Fragment, ReactElement, TransitionEvent, useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDeviceContext } from '../device-context-provider';
import { RadioButton } from '../radio-button';
import { Toggletip, ToggletipProps } from '../toggletip';
import { Tooltip, TooltipProps } from '../tooltip';

const StyledFieldset = styled.fieldset`
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
`;

const StyledLegend = styled.legend<{ isMobile: boolean }>`
    align-items: center;
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

const StyledToggletip = styled(Toggletip)`
    margin-left: var(--spacing-half);
`;

interface ContentWrapperProps {
    $isCollapsing: boolean;
    $isExpanded: boolean;
    $maxHeight?: number;
    $transitionDuration: number;
}

function getTransition({ $isCollapsing, $transitionDuration }: ContentWrapperProps): string {
    const maxHeightTransition = `max-height ${$transitionDuration}ms ease-in-out`;
    if ($isCollapsing) {
        const marginTransition = `margin-bottom ${$transitionDuration / 2}ms ${$transitionDuration / 2}ms ease-in-out`;
        return `${maxHeightTransition}, ${marginTransition}`;
    }

    return maxHeightTransition;
}

const ContentWrapper = styled.div<ContentWrapperProps>(({
    $isExpanded,
    $maxHeight = 500,
}) => css`
    max-height: ${$isExpanded ? `${$maxHeight}px` : '0'};
    overflow: hidden;
    transition: ${getTransition};

    :not(:last-child) {
        margin-bottom: ${$isExpanded ? 'var(--spacing-1x)' : '0'};
    }
`);

const InnerContent = styled.div<{ $isExpanded: boolean, $transitionStarted: boolean }>(({
    $isExpanded,
    $transitionStarted,
}) => `
    display: ${$isExpanded || $transitionStarted ? 'block' : 'none'};
`);

export interface RadioButtonGroupButtonProps {
    label: string;
    value: string;
    id?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    content?: {
        element: ReactElement;
        maxHeight?: number;
    };
}

export interface RadioButtonGroupProps {
    ariaLabel?: string;
    ariaLabelledBy?: string[];
    className?: string;
    id?: string;
    label?: string;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
    /** Sets the name property of all buttons */
    groupName: string;
    checkedValue?: string;
    buttons: RadioButtonGroupButtonProps[];
    /** Duration in milliseconds */
    transitionDuration?: number;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
    ariaLabel,
    ariaLabelledBy,
    buttons,
    className,
    groupName,
    label,
    tooltip,
    toggletip,
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
    const [collapsingElement, setCollapsingElement] = useState<string>();
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ? dataAttributes['data-testid'] : 'radio-button-group';

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setCurrentChecked(event.target.value);
        onChange?.(event);
    }, [onChange, setCurrentChecked]);

    let newRefValue: string | undefined;
    if (checkedValue !== undefined && checkedValue !== prevChecked.current) {
        setCurrentChecked(checkedValue);
        newRefValue = checkedValue;
    }

    if (currentChecked !== prevChecked.current) {
        const willHaveTransition = buttons.find((b) => b.value === prevChecked.current)?.content
            || buttons.find((b) => b.value === currentChecked)?.content;

        if (willHaveTransition) {
            setCollapsingElement(prevChecked.current);
            setTransitionStarted(true);
        }
        newRefValue = currentChecked;
    }

    if (newRefValue !== undefined) {
        prevChecked.current = newRefValue;
    }

    const handleTransitionEnd = useCallback((event: TransitionEvent) => {
        if (event.propertyName === 'max-height') {
            setCollapsingElement(undefined);
            setTransitionStarted(false);
        }
    }, []);

    return (
        <StyledFieldset key={label} className={className}>
            {label && (
                <StyledLegend key="legend" isMobile={isMobile}>
                    {label}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {tooltip && <StyledTooltip {...tooltip} />}
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {toggletip && <StyledToggletip size="small" {...toggletip} />}
                </StyledLegend>
            )}
            {buttons.map((button) => {
                const isExpanded = currentChecked === button.value;

                return (
                    <Fragment key={`${groupName}-${button.value}-fragment`}>
                        <StyledRadioButton
                            key={`${groupName}-${button.value}`}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy?.join(' ')}
                            checked={checkedValue ? checkedValue === button.value : undefined}
                            className={className}
                            data-testid={`${dataTestId}-${button.value}`}
                            defaultChecked={button.defaultChecked}
                            disabled={button.disabled}
                            id={button.id}
                            label={button.label}
                            name={groupName}
                            onChange={handleChange}
                            value={button.value}
                        />
                        {button.content && (
                            <ContentWrapper
                                key={`${groupName}-${button.value}-content`}
                                data-testid="content-wrapper"
                                $maxHeight={button.content.maxHeight}
                                $isExpanded={isExpanded}
                                $isCollapsing={transitionStarted && collapsingElement === button.value}
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
                    </Fragment>
                );
            })}
        </StyledFieldset>
    );
};

RadioButtonGroup.displayName = 'RadioButtonGroup';
