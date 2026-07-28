import {
    cloneElement,
    FunctionComponent,
    isValidElement,
    KeyboardEvent as ReactKeyboardEvent,
    PropsWithChildren,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { type PopperOptions, type TriggerType, usePopperTooltip } from 'react-popper-tooltip';
import styled, { css } from 'styled-components';
import { useTheme } from '../../hooks/use-theme';
import { type ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider';
import { Icon } from '../icon';

export type TooltipMode = 'normal' | 'confirm';
export type TooltipVariant = 'normal' | 'success';

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

interface TooltipContainerProps {
    isMobile?: boolean;
    variant: TooltipVariant;
    visible: boolean;
}

interface TooltipColorProps {
    theme: ResolvedTheme;
    variant: TooltipVariant;
}

const tooltipColor = css<TooltipColorProps>`${({ theme, variant }) => {
    if (variant === 'success') {
        return theme.component['tooltip-popper-container-success-background-color'];
    }
    return theme.component['tooltip-popper-container-default-background-color'];
}}`;

const tooltipBorderColor = css<{ theme: ResolvedTheme }>`${({ theme }) => theme.component['tooltip-popper-container-border-color']}`;

const TooltipContainer = styled.div<TooltipContainerProps>`
    background-color: ${tooltipColor};
    border: 1px solid ${tooltipBorderColor};
    border-radius: var(--border-radius-half);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['tooltip-popper-container-text-color']};
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
        border-color: transparent transparent ${tooltipBorderColor} transparent;
        border-width: 0 0.5rem 0.5rem;
        position: absolute;
        top: -2px;
    }

    &[data-popper-placement*="bottom"] > ${TooltipArrow}::after {
        border-color: transparent transparent ${tooltipColor} transparent;
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
        border-color: ${tooltipBorderColor} transparent transparent transparent;
        border-width: 0.5rem 0.5rem 0;
        position: absolute;
        top: 0;
    }

    &[data-popper-placement*="top"] > ${TooltipArrow}::after {
        border-color: ${tooltipColor} transparent transparent transparent;
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
        border-color: transparent ${tooltipBorderColor} transparent transparent;
        border-width: 0.5rem 0.5rem 0.5rem 0;
    }

    &[data-popper-placement*="right"] > ${TooltipArrow}::after {
        border-color: transparent ${tooltipColor} transparent transparent;
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
        border-color: transparent transparent transparent ${tooltipBorderColor};
        border-width: 0.5rem 0 0.5rem 0.5rem;
    }

    &[data-popper-placement*="left"] > ${TooltipArrow}::after {
        border-color: transparent transparent transparent ${tooltipColor};
        border-width: 0.5rem 0 0.5rem 0.5rem;
        left: 0.17rem;
        top: 0;
    }
`;

const TooltipLabelContainer = styled.div`
    align-items: center;
    display: flex;
`;

const StyledSpan = styled.span`
    align-items: center;
    display: flex;
    width: fit-content;

    ${focus};
`;

const ConfirmCheckIcon = styled(Icon)`
    margin-right: 0.25rem;
`;

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
    className?: string;
    confirmationLabel?: string;
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
    invertedIcon?: boolean;
    /** Tooltip text content */
    label: string;
    mode?: TooltipMode;
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
    desktopPlacement = 'right',
    disabled,
    invertedIcon = false,
    label,
    mode = 'normal',
    confirmationLabel,
}) => {
    const { isMobile } = useDeviceContext();
    const Theme = useTheme();
    const tooltipId = useMemo(uuid, []);
    const tooltipTriggerId = useMemo(() => `tooltip-trigger-${tooltipId}`, [tooltipId]);
    const [isVisible, setIsVisible] = useState(defaultOpen);
    const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | undefined>();
    const [controlledTooltipOpen, setControlledTooltipOpen] = useState<boolean>();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const currentLabel = isClicked ? (confirmationLabel ?? label) : label;
    const tooltipVariant = (mode === 'confirm' && isClicked) ? 'success' : 'normal';
    const prevLabel = useRef(currentLabel);

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

    if (prevLabel.current !== currentLabel) {
        prevLabel.current = currentLabel;
        popperTooltip?.update?.();
    }

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

    const handleOnClick = useCallback(() => {
        setIsClicked(true);
    }, [setIsClicked]);

    const handleFocus = useCallback((): void => {
        if (!isMobile) {
            openTooltip();
        }
    }, [isMobile, openTooltip]);

    const handleMouseEnter = useCallback((): void => {
        if (!isMobile) {
            openTooltip();
        }
    }, [isMobile, openTooltip]);

    const handleMouseLeave = useCallback((): void => {
        if (!isMobile) {
            closeTooltip();
        }
        setIsClicked(false);
    }, [isMobile, closeTooltip]);

    const renderChildrenWithAria = (): ReactNode => {
        if (!children) {
            return (
                <Icon
                    name="info"
                    size={isMobile ? '24' : '16'}
                    color={invertedIcon
                        ? Theme.component['tooltip-inverted-icon-color']
                        : Theme.component['tooltip-icon-color']}
                    aria-describedby={isVisible ? tooltipId : undefined}
                />
            );
        }

        if (isValidElement(children)) {
            return cloneElement(children as ReactElement, {
                'aria-describedby': tooltipId,
            });
        }

        return children;
    };

    return (
        <>
            <StyledSpan
                data-testid="tooltip"
                className={className}
                id={tooltipTriggerId}
                tabIndex={(children || disabled) ? -1 : 0}
                onBlur={handleBLur}
                onClick={handleOnClick}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={popperTooltip.setTriggerRef}
            >
                {renderChildrenWithAria()}
            </StyledSpan>

            <TooltipContainer
                data-testid="tooltip-content-container"
                aria-hidden={!isVisible}
                id={tooltipId}
                role="tooltip"
                ref={popperTooltip.setTooltipRef}
                isMobile={isMobile}
                variant={tooltipVariant}
                visible={popperTooltip.visible}
                {...popperTooltip.getTooltipProps() /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                <TooltipArrow
                    {...popperTooltip.getArrowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <TooltipLabelContainer>
                    {(isClicked && mode === 'confirm') && (
                        <ConfirmCheckIcon data-testid='tooltip-confirm-icon' name="check" size='16' />
                    )}
                    {currentLabel}
                </TooltipLabelContainer>
            </TooltipContainer>
        </>
    );
};

Tooltip.displayName = 'Tooltip';
