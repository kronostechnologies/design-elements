import React, { KeyboardEvent, MouseEvent, ReactElement, ReactNode, useState } from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { useTheme } from '../../hooks/use-theme';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

export const TooltipContainer = styled.div<{isMobile?: boolean}>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['light-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: ${({ isMobile }) => isMobile ? '1rem' : '0.875rem'};
    justify-content: center;
    line-height: ${({ isMobile }) => isMobile ? '1.5rem' : '1.25rem'};
    margin: var(--spacing-1x) 12px;
    max-width: 327px;
    min-height: ${({ isMobile }) => isMobile ? '72px' : '32px'};
    padding: ${({ isMobile }) => isMobile ? 'var(--spacing-3x)' : 'var(--spacing-1x)'};
    transition: opacity 300ms;
    z-index: 1000;
`;

export const TooltipArrow = styled.div`
    height: 1rem;
    position: absolute;
    width: 1rem;

    &::before {
        border-style: solid;
        content: '';
        display: block;
        height: 0;
        margin: auto;
        width: 0;
    }

    &::after {
        border-style: solid;
        content: '';
        display: block;
        height: 0;
        margin: auto;
        position: absolute;
        width: 0;
    }

    &[data-placement*='bottom'] {
        height: 1rem;
        left: 0;
        margin-top: -0.4rem;
        top: 0;
        width: 1rem;
    }

    &[data-placement*='bottom']::before {
        border-color: transparent transparent ${({ theme }) => theme.greys['light-grey']} transparent;
        border-width: 0 0.5rem 0.4rem 0.5rem;
        position: absolute;
        top: -1px;
    }

    &[data-placement*='bottom']::after {
        border-color: transparent transparent ${({ theme }) => theme.greys.white} transparent;
        border-width: 0 0.5rem 0.4rem 0.5rem;
    }

    &[data-placement*='top'] {
        bottom: 0;
        height: 1rem;
        left: 0;
        margin-bottom: -1rem;
        width: 1rem;
    }

    &[data-placement*='top']::before {
        border-color: ${({ theme }) => theme.greys['light-grey']} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0 0.5rem;
        position: absolute;
        top: 1px;
    }

    &[data-placement*='top']::after {
        border-color: ${({ theme }) => theme.greys.white} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0 0.5rem;
    }

    &[data-placement*='right'] {
        height: 1rem;
        left: 0;
        margin-left: -0.7rem;
        width: 1rem;
    }

    &[data-placement*='right']::before {
        border-color: transparent ${({ theme }) => theme.greys['light-grey']} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
    }

    &[data-placement*='right']::after {
        border-color: transparent ${({ theme }) => theme.greys.white} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
        left: 6px;
        top: 0;
    }

    &[data-placement*='left'] {
        height: 1rem;
        margin-right: -0.7rem;
        right: 0;
        width: 1rem;
    }

    &[data-placement*='left']::before {
        border-color: transparent transparent transparent ${({ theme }) => theme.greys['light-grey']};
        border-width: 0.5rem 0 0.5rem 0.4em;
    }

    &[data-placement*='left']::after {
        border-color: transparent transparent transparent ${({ theme }) => theme.greys.white};
        border-width: 0.5rem 0 0.5rem 0.4em;
        left: 3px;
        top: 0;
    }
`;

const StyledSpan = styled.span`
    align-items: center;
    display: flex;
    width: fit-content;
`;

type PlacementType = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
    /**
     * Tooltip placement. Always top on mobile
     * @default right
     **/
    placement?: PlacementType;
    /** Tootip text content */
    children: ReactNode;
    /** Set tooltip open by default */
    defaultOpen?: boolean;
}

export function Tooltip({ children, defaultOpen, ...props }: TooltipProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const hideArrow = false;
    const Theme = useTheme();
    const tooltipId = uuid();
    const [ariaHidden, setAriaHidden] = useState(defaultOpen ? false : true);
    const [tooltipOpen, setTooltipOpen] = useState();

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>): void => {
        if (!isMobile && event.key === 'Escape' && tooltipOpen) {
            setTooltipOpen(undefined);
        }
    };

    const handleVisibilityChange = (visible: boolean): void => {
        setAriaHidden(!visible);
    };

    return (
        <TooltipTrigger
            {...props}
            placement={isMobile ? 'top' : props.placement}
            trigger={isMobile ? 'click' : 'hover'}
            defaultTooltipShown={defaultOpen}
            tooltipShown={tooltipOpen}
            onVisibilityChange={handleVisibilityChange}
            tooltip={({
                arrowRef,
                tooltipRef,
                getArrowProps,
                getTooltipProps,
                placement,
            }) => (
                <TooltipContainer
                    aria-hidden={ariaHidden}
                    isMobile={isMobile}
                    id={tooltipId}
                    role="tooltip"
                    {...getTooltipProps({ ref: tooltipRef })}
                >
                    {!hideArrow && (
                        <TooltipArrow
                            {...getArrowProps({
                                ref: arrowRef,
                                'data-placement': placement,
                            })}
                        />
                    )}
                    {children}
                </TooltipContainer>
            )}
        >
            {({ getTriggerProps, triggerRef }) => (
                <StyledSpan
                    aria-describedby={tooltipId}
                    tabIndex={0}
                    onBlur={() => !isMobile && setTooltipOpen(undefined)}
                    onFocus={() => !isMobile && setTooltipOpen(true)}
                    onMouseDown={(event: MouseEvent<HTMLSpanElement>) => event.preventDefault()}
                    onKeyDown={handleKeyDown}
                    {...getTriggerProps({ ref: triggerRef })}
                >
                    <Icon name="helpCircle" size={isMobile ? '24' : '16'} color={Theme.greys['dark-grey']} />
                </StyledSpan>
            )}
        </TooltipTrigger>
    );
}
