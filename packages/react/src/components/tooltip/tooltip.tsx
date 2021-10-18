import React, {
    FunctionComponent,
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { PopperOptions, TriggerType, usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';
import { useTheme } from '../../hooks/use-theme';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

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
`;

const TooltipContainer = styled.div<{ isMobile?: boolean, visible: boolean }>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.19);
    box-sizing: border-box;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    flex-direction: column;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    justify-content: center;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    max-width: 327px;
    min-height: ${({ isMobile }) => (isMobile ? '72px' : '32px')};
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : 'var(--spacing-1x)')};
    transition: opacity 300ms;
    z-index: 1000;

    &[data-popper-placement*='bottom'] > ${TooltipArrow} {
        height: 1rem;
        left: 0;
        margin-top: -0.4rem;
        top: 0;
        width: 1rem;
    }

    &[data-popper-placement*='bottom'] > ${TooltipArrow}::before {
        border-color: transparent transparent ${({ theme }) => theme.greys['dark-grey']} transparent;
        border-width: 0 0.5rem 0.4rem 0.5rem;
        position: absolute;
        top: -1px;
    }

    &[data-popper-placement*='bottom'] > ${TooltipArrow}::after {
        border-color: transparent transparent ${({ theme }) => theme.greys.white} transparent;
        border-width: 0 0.5rem 0.4rem 0.5rem;
    }

    &[data-popper-placement*='top'] > ${TooltipArrow} {
        bottom: 0;
        height: 1rem;
        left: 0;
        margin-bottom: -1rem;
        width: 1rem;
    }

    &[data-popper-placement*='top'] > ${TooltipArrow}::before {
        border-color: ${({ theme }) => theme.greys['dark-grey']} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0 0.5rem;
        position: absolute;
        top: 1px;
    }

    &[data-popper-placement*='top'] > ${TooltipArrow}::after {
        border-color: ${({ theme }) => theme.greys.white} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0 0.5rem;
    }

    &[data-popper-placement*='right'] > ${TooltipArrow} {
        height: 1rem;
        left: 0;
        margin-left: -0.7rem;
        width: 1rem;
    }

    &[data-popper-placement*='right'] > ${TooltipArrow}::before {
        border-color: transparent ${({ theme }) => theme.greys['dark-grey']} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
    }

    &[data-popper-placement*='right'] > ${TooltipArrow}::after {
        border-color: transparent ${({ theme }) => theme.greys.white} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
        left: 6px;
        top: 0;
    }

    &[data-popper-placement*='left'] > ${TooltipArrow} {
        height: 1rem;
        margin-right: -0.7rem;
        right: 0;
        width: 1rem;
    }

    &[data-popper-placement*='left'] > ${TooltipArrow}::before {
        border-color: transparent transparent transparent ${({ theme }) => theme.greys['dark-grey']};
        border-width: 0.5rem 0 0.5rem 0.4em;
    }

    &[data-popper-placement*='left'] > ${TooltipArrow}::after {
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

    ${focus};
`;

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
    className?: string;
    /** Set tooltip open by default */
    defaultOpen?: boolean;
    /**
     * Tooltip placement on desktop (always top on mobile)
     * @default right
     */
    desktopPlacement?: TooltipPlacement;
    disabled?: boolean;
    /** Tooltip text content */
    label: string;
}

const modifiers: PopperOptions['modifiers'] = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
];

export const Tooltip: FunctionComponent<TooltipProps> = ({
    children,
    className,
    defaultOpen,
    disabled,
    label,
    desktopPlacement = 'right',
}) => {
    const { isMobile } = useDeviceContext();
    const Theme = useTheme();
    const tooltipId = useMemo(uuid, []);
    const tooltipTriggerId = useMemo(() => `tooltip-trigger-${tooltipId}`, [tooltipId]);
    const [isVisible, setIsVisible] = useState(defaultOpen);
    const [controlledTooltipOpen, setControlledTooltipOpen] = useState<boolean>();

    function getTooltipTriggerType(): TriggerType | null {
        if (disabled) {
            return null;
        }
        if (isMobile) {
            return 'click';
        }
        return 'hover';
    }
    const popperTooltip = usePopperTooltip({
        defaultVisible: defaultOpen,
        placement: isMobile ? 'top' : desktopPlacement,
        onVisibleChange: setIsVisible,
        trigger: getTooltipTriggerType(),
        visible: disabled ? false : controlledTooltipOpen,
    }, { modifiers });

    const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLSpanElement> | KeyboardEvent): void => {
        if (event.key === 'Escape' && !isMobile) {
            if (isVisible) {
                document.getElementById(tooltipTriggerId)?.click();
            }

            if (controlledTooltipOpen) {
                setControlledTooltipOpen(false);
            }
        }
    }, [isMobile, isVisible, controlledTooltipOpen, tooltipTriggerId]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (disabled) {
            setControlledTooltipOpen(false);
        } else {
            setControlledTooltipOpen(undefined);
        }
    }, [disabled]);

    useEffect(() => {
        if (isMobile) {
            setControlledTooltipOpen(undefined);
        }
    }, [isMobile]);

    function handleBLur(): void {
        if (!isMobile) {
            setControlledTooltipOpen(false);
        }
    }

    function handleFocus(): void {
        if (!isMobile) {
            setControlledTooltipOpen(true);
        }
    }

    function handleMouseDown(event: MouseEvent<HTMLSpanElement>): void {
        event.preventDefault();
    }

    return (
        <>
            <StyledSpan
                data-testid="tooltip"
                className={className}
                aria-describedby={tooltipId}
                id={tooltipTriggerId}
                tabIndex={(children || disabled) ? -1 : 0}
                onBlur={handleBLur}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                onKeyDown={handleKeyDown}
                ref={popperTooltip.setTriggerRef}
            >
                {children || (
                    <Icon
                        name="helpCircle"
                        size={isMobile ? '24' : '16'}
                        color={Theme.greys['dark-grey']}
                    />
                )}
            </StyledSpan>

            <TooltipContainer
                data-testid="tooltip-content-container"
                aria-hidden={!isVisible}
                isMobile={isMobile}
                id={tooltipId}
                role="tooltip"
                ref={popperTooltip.setTooltipRef}
                visible={popperTooltip.visible}
                {...popperTooltip.getTooltipProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                <TooltipArrow
                    {...popperTooltip.getArrowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                {label}
            </TooltipContainer>
        </>
    );
};
