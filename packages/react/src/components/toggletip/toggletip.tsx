import { FunctionComponent, ReactNode, useMemo, useState } from 'react';
import { type PopperOptions, usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/use-click-outside';
import { v4 as uuid } from '../../utils/uuid';
import { IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { type IconName } from '../icon';

type Size = 'small' | 'medium';
type MaxWidth = 'small' | 'medium' | 'large';

const getToggletipMaxWidthStyles = ({ maxWidth }: { maxWidth?: MaxWidth }): string => {
    switch (maxWidth) {
        case 'small':
            return '18rem';
        case 'large':
            return '26rem';
        case 'medium':
        default:
            return '22rem';
    }
};

const ToggletipArrow = styled.div`
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

const ToggletipContainer = styled.div<{ isMobile?: boolean; maxWidth?: MaxWidth }>`
    background-color: ${({ theme }) => theme.component['toggletip-popper-container-background-color']};
    border: 1px solid ${({ theme }) => theme.component['toggletip-popper-container-border-color']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['toggletip-popper-container-text-color']};
    display: flex;
    flex-direction: column;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    justify-content: center;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    max-width: ${getToggletipMaxWidthStyles};
    min-height: ${({ isMobile }) => (isMobile ? '4.5rem' : '2rem')};
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : 'var(--spacing-2x) var(--spacing-3x)')};
    transition: opacity 300ms;
    z-index: 1000;

    &[data-popper-placement*="bottom"] > ${ToggletipArrow} {
        height: 1rem;
        left: 0;
        margin-top: -0.35rem;
        top: 0;
        width: 1rem;
    }

    &[data-popper-placement*="bottom"] > ${ToggletipArrow}::before {
        border-color: transparent transparent ${({ theme }) => theme.component['toggletip-popper-container-border-color']} transparent;
        border-width: 0 0.5rem 0.6rem;
        position: absolute;
        top: -0.25rem;
    }

    &[data-popper-placement*="bottom"] > ${ToggletipArrow}::after {
        border-color: transparent transparent ${({ theme }) => theme.component['toggletip-popper-container-background-color']} transparent;
        border-width: 0 0.5rem 0.6rem;
        top: -0.15rem;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow} {
        bottom: 0;
        height: 1rem;
        left: 0;
        margin-bottom: -1rem;
        width: 1rem;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow}::before {
        border-color: ${({ theme }) => theme.component['toggletip-popper-container-border-color']} transparent transparent transparent;
        border-width: 0.5rem 0.45rem 0;
        position: absolute;
        top: 0.05rem;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow}::after {
        border-color: ${({ theme }) => theme.component['toggletip-popper-container-background-color']} transparent transparent transparent;
        border-width: 0.5rem 0.45rem 0;
        position: absolute;
        top: -0.02rem;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow} {
        height: 1rem;
        left: 0;
        margin-left: -0.7rem;
        width: 1rem;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow}::before {
        border-color: transparent ${({ theme }) => theme.component['toggletip-popper-container-border-color']} transparent transparent;
        border-width: 0.45rem 0.5rem 0.45rem 0;
        left: 0.15rem;
        position: absolute;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow}::after {
        border-color: transparent ${({ theme }) => theme.component['toggletip-popper-container-background-color']} transparent transparent;
        border-width: 0.45rem 0.5rem 0.45rem 0;
        left: 0.23rem;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow} {
        height: 1rem;
        margin-right: -0.7rem;
        right: 0;
        width: 1rem;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow}::before {
        border-color: transparent transparent transparent ${({ theme }) => theme.component['toggletip-popper-container-border-color']};
        border-width: 0.45rem 0 0.45rem 0.5rem;
        left: 0.33rem;
        position: absolute;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow}::after {
        border-color: transparent transparent transparent ${({ theme }) => theme.component['toggletip-popper-container-background-color']};
        border-width: 0.45rem 0 0.45rem 0.5rem;
        left: 0.25rem;
    }
`;

export type ToggletipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface ToggletipProps {
    label?: string,
    iconName?: IconName,
    children?: ReactNode | ReactNode[];
    className?: string;
    /**
     * Toggletip closes when clicking outside the content or the trigger
     * @default true
     */
    closeOnClickOutside?: boolean;
    /**
     * Set whether the toggletip is initially open
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Toggletip placement on desktop (always top on mobile)
     * @default right
     */
    desktopPlacement?: ToggletipPlacement;
    disabled?: boolean;
    invertedIcon?: boolean;
    size?: Size;
    maxWidth?: MaxWidth;
}

const modifiers: PopperOptions['modifiers'] = [
    {
        name: 'offset',
        options: {
            offset: [0, 12],
        },
    },
];

export const Toggletip: FunctionComponent<ToggletipProps> = ({
    label,
    iconName = 'info',
    children,
    className,
    closeOnClickOutside = true,
    defaultOpen = false,
    disabled,
    desktopPlacement = 'right',
    invertedIcon = false,
    size = 'medium',
    maxWidth = 'medium',
}) => {
    const { isMobile } = useDeviceContext();
    const [isVisible, setVisible] = useState(defaultOpen);
    const toggletipId = useMemo(uuid, []);

    const {
        visible,
        getTooltipProps,
        getArrowProps,
        setTooltipRef,
        setTriggerRef,
        tooltipRef,
        triggerRef,
    } = usePopperTooltip({
        defaultVisible: defaultOpen,
        placement: isMobile ? 'top' : desktopPlacement,
        trigger: 'click',
        visible: disabled ? false : isVisible,
        closeOnOutsideClick: false,
    }, { modifiers });

    useClickOutside([tooltipRef, triggerRef], () => {
        if (closeOnClickOutside) {
            setVisible(false);
        }
    });

    return (
        <>
            <IconButton
                type="button"
                disabled={disabled}
                label={label || iconName}
                iconName={iconName}
                data-testid="toggletip"
                buttonType="tertiary"
                className={className}
                aria-controls={toggletipId}
                aria-expanded={visible}
                onClick={() => setVisible(!isVisible)}
                ref={setTriggerRef}
                inverted={invertedIcon}
                size={size}
            />

            {isVisible && (
                <ToggletipContainer
                    data-testid="toggletip-content-container"
                    isMobile={isMobile}
                    id={toggletipId}
                    ref={setTooltipRef}
                    maxWidth={maxWidth}
                    {...getTooltipProps() /* eslint-disable-line react/jsx-props-no-spreading */}
                >
                    <ToggletipArrow
                        {...getArrowProps() /* eslint-disable-line react/jsx-props-no-spreading */}
                    />
                    {children}
                </ToggletipContainer>
            )}
        </>
    );
};

Toggletip.displayName = 'Toggletip';
