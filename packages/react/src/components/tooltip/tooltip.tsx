import {
    FunctionComponent,
    KeyboardEvent as ReactKeyboardEvent,
    MouseEvent,
    PropsWithChildren,
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
    height: 1.25rem;
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

const TooltipContainer = styled.div<{ isMobile?: boolean, visible: boolean, inverted: boolean }>`
    background-color: ${({ theme }) => theme.greys['dark-grey']};
    border: 1px solid ${({ theme, inverted }) => (inverted ? theme.greys.white : theme.greys['dark-grey'])};
    border-radius: var(--border-radius-half);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.greys.white};
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    flex-direction: column;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.75rem')};
    justify-content: center;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    max-width: 327px;
    min-height: ${({ isMobile }) => (isMobile ? '72px' : '24px')};
    padding: 1px ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : 'var(--spacing-1x)')};
    transition: opacity 300ms;
    z-index: 1000;

    &[data-popper-placement*="bottom"] > ${TooltipArrow} {
        height: 1rem;
        left: 0;
        margin-top: -0.375rem;
        top: 0;
        width: 1rem;
    }

    &[data-popper-placement*="bottom"] > ${TooltipArrow}::before {
        border-color: transparent transparent ${({ theme, inverted }) => (inverted ? theme.greys.white : theme.greys['dark-grey'])} transparent;
        border-width: 0 0.5rem 0.5rem;
        position: absolute;
        top: -2px;
    }

    &[data-popper-placement*="bottom"] > ${TooltipArrow}::after {
        border-color: transparent transparent ${({ theme }) => theme.greys['dark-grey']} transparent;
        border-width: 0 0.5rem 0.5rem;
    }

    &[data-popper-placement*="top"] > ${TooltipArrow} {
        bottom: 0;
        height: 0;
        left: 0;
        margin-bottom: 0;
        width: 1rem;
    }

    &[data-popper-placement*="top"] > ${TooltipArrow}::before {
        border-color: ${({ theme, inverted }) => (inverted ? theme.greys.white : theme.greys['dark-grey'])} transparent transparent transparent;
        border-width: 0.5rem 0.5rem 0;
        position: absolute;
        top: 0;
    }

    &[data-popper-placement*="top"] > ${TooltipArrow}::after {
        border-color: ${({ theme }) => theme.greys['dark-grey']} transparent transparent transparent;
        border-width: 0.5rem 0.5rem 0;
        top: -0.1rem;
    }

    &[data-popper-placement*="right"] > ${TooltipArrow} {
        height: 1rem;
        left: 0;
        margin-left: -0.8rem;
        width: 1rem;
    }

    &[data-popper-placement*="right"] > ${TooltipArrow}::before {
        border-color: transparent ${({ theme, inverted }) => (inverted ? theme.greys.white : theme.greys['dark-grey'])} transparent transparent;
        border-width: 0.5rem 0.5rem 0.5rem 0;
    }

    &[data-popper-placement*="right"] > ${TooltipArrow}::after {
        border-color: transparent ${({ theme }) => theme.greys['dark-grey']} transparent transparent;
        border-width: 0.5rem 0.5rem 0.5rem 0;
        left: 0.375rem;
        top: 0;
    }

    &[data-popper-placement*="left"] > ${TooltipArrow} {
        height: 1rem;
        margin-right: -0.7rem;
        right: -1px;
        width: 1rem;
    }

    &[data-popper-placement*="left"] > ${TooltipArrow}::before {
        border-color: transparent transparent transparent ${({ theme, inverted }) => (inverted ? theme.greys.white : theme.greys['dark-grey'])};
        border-width: 0.5rem 0 0.5rem 0.5rem;
    }

    &[data-popper-placement*="left"] > ${TooltipArrow}::after {
        border-color: transparent transparent transparent ${({ theme }) => theme.greys['dark-grey']};
        border-width: 0.5rem 0 0.5rem 0.5rem;
        left: 0.17rem;
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

export interface TooltipProps {
    className?: string;
    /** Set tooltip open by default */
    defaultOpen?: boolean;
    /**
     * Tooltip placement on desktop (always top on mobile)
     * @default right
     */
    desktopPlacement?: TooltipPlacement;
    /** Adds delay to tooltip */
    delayed?: boolean;
    disabled?: boolean;
    /** Tooltip text content */
    label: string;
    invertedIcon?: boolean;
}

const modifiers: PopperOptions['modifiers'] = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
];
const titleDelay = 250;

export const Tooltip: FunctionComponent<PropsWithChildren<TooltipProps>> = ({
    children,
    className,
    defaultOpen,
    delayed,
    disabled,
    label,
    desktopPlacement = 'right',
    invertedIcon = false,
}) => {
    const { isMobile } = useDeviceContext();
    const Theme = useTheme();
    const tooltipId = useMemo(uuid, []);
    const tooltipTriggerId = useMemo(() => `tooltip-trigger-${tooltipId}`, [tooltipId]);
    const [isVisible, setIsVisible] = useState(defaultOpen);
    const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | undefined>();
    const [controlledTooltipOpen, setControlledTooltipOpen] = useState<boolean>();

    const getTooltipTriggerType = useCallback((): TriggerType | null => {
        if (disabled) {
            return null;
        }
        if (isMobile) {
            return 'click';
        }
        return 'hover';
    }, [disabled, isMobile]);

    const popperTooltip = usePopperTooltip({
        defaultVisible: defaultOpen,
        placement: isMobile ? 'top' : desktopPlacement,
        onVisibleChange: setIsVisible,
        trigger: getTooltipTriggerType(),
        visible: disabled ? false : controlledTooltipOpen,
        delayShow: delayed ? titleDelay : undefined,
    }, { modifiers });

    const openTooltip = useCallback((): void => {
        if (delayed && !disabled) {
            setTooltipTimeout(() => setTimeout(() => setControlledTooltipOpen(true), titleDelay));
        } else {
            setControlledTooltipOpen(true);
        }
    }, [delayed, disabled]);

    const closeTooltip = useCallback((): void => {
        if (delayed && tooltipTimeout) {
            clearTimeout(tooltipTimeout);
            setTooltipTimeout(undefined);
        }
        setControlledTooltipOpen(false);
    }, [delayed, tooltipTimeout, setControlledTooltipOpen]);

    const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLSpanElement> | KeyboardEvent): void => {
        if (event.key === 'Escape' && !isMobile) {
            if (isVisible) {
                document.getElementById(tooltipTriggerId)?.click();
            }
            closeTooltip();
        }
    }, [closeTooltip, isMobile, isVisible, tooltipTriggerId]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (disabled) {
            closeTooltip();
        }
    }, [closeTooltip, disabled]);

    useEffect(() => {
        if (isMobile) {
            setControlledTooltipOpen(undefined);
        }
    }, [isMobile]);

    const handleBLur = useCallback((): void => {
        if (!isMobile) {
            closeTooltip();
        }
    }, [isMobile, closeTooltip]);

    const handleFocus = useCallback((): void => {
        if (!isMobile) {
            openTooltip();
        }
    }, [isMobile, openTooltip]);

    const handleMouseDown = useCallback((event: MouseEvent<HTMLSpanElement>): void => {
        event.preventDefault();
    }, []);

    const handleMouseEnter = useCallback((): void => {
        if (!isMobile) {
            openTooltip();
        }
    }, [isMobile, openTooltip]);

    const handleMouseLeave = useCallback((): void => {
        if (!isMobile) {
            closeTooltip();
        }
    }, [isMobile, closeTooltip]);

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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                ref={popperTooltip.setTriggerRef}
            >
                {children || (
                    <Icon
                        name="info"
                        size={isMobile ? '24' : '16'}
                        color={invertedIcon ? Theme.greys.white : Theme.greys['dark-grey']}
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
                inverted={invertedIcon}
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
