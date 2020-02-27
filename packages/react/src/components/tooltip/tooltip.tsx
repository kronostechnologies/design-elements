import React, { ReactNode } from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../icon/icon';

const TooltipContainer = styled.div<{device?: DeviceType}>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: ${({ device }) => device === 'mobile' ? '1rem' : '0.875rem'};
    justify-content: center;
    line-height: ${({ device }) => device === 'mobile' ? '24px' : '20px'};
    margin: var(--spacing-1x);
    max-width: 327px;
    min-height: ${({ device }) => device === 'mobile' ? '72px' : '32px'};
    padding: ${({ device }) => device === 'mobile' ? 'var(--spacing-3x)' : 'var(--spacing-1x)'};
    transition: opacity 300ms;
    z-index: 1000;
`;

const TooltipArrow = styled.div`
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
        border-color: transparent transparent ${({ theme }) => theme.greys.grey} transparent;
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
        border-color: ${({ theme }) => theme.greys.grey} transparent transparent transparent;
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
        border-color: transparent ${({ theme }) => theme.greys.grey} transparent transparent;
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
        border-color: transparent transparent transparent ${({ theme }) => theme.greys.grey};
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

type DeviceType = 'mobile' | 'desktop';
type TriggerType = 'click' | 'hover' | 'right-click';
type PlacementType = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
    device?: DeviceType;
    /**
     * Trigger event type. Alway click on mobile
     * @default hover
     **/
    trigger?: TriggerType;
    /**
     * Tooltip placement. Always top on mobile
     * @default right
     **/
    placement?: PlacementType;
    /** Tootip text content */
    children: ReactNode;
}

export const Tooltip = ({ children, device, ...props }: TooltipProps) => {
    const hideArrow = false;
    const Theme = useTheme();
    const tooltipId = uuid();

    return (
        <TooltipTrigger
            {...props}
            placement={device === 'mobile' ? 'top' : props.placement}
            trigger={device === 'mobile' ? 'click' : props.trigger}
            tooltip={({
                arrowRef,
                tooltipRef,
                getArrowProps,
                getTooltipProps,
                placement,
            }) => (
                <TooltipContainer
                    device={device}
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
                    aria-labelledby={tooltipId}
                    tabIndex={0}
                    {...getTriggerProps({ ref: triggerRef })}
                >
                    <Icon name="helpCircle" size={device === 'mobile' ? '24' : '16'} color={Theme.greys['dark-grey']} />
                </StyledSpan>
            )}
        </TooltipTrigger>
    );
};
