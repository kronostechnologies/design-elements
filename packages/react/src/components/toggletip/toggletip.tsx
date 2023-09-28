import {
    FunctionComponent,
    ReactNode,
    useMemo, useState,
} from 'react';
import { PopperOptions, usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { IconButton } from '../buttons/icon-button';
import { IconName } from '../icon/icon';

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

const ToggletipContainer = styled.div<{ isMobile?: boolean }>`
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    flex-direction: column;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};
    justify-content: center;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    max-width: 327px;
    min-height: ${({ isMobile }) => (isMobile ? '4.5rem' : '2rem')};
    padding: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : 'var(--spacing-1x) var(--spacing-1halfx)')};
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
        border-color: transparent transparent ${({ theme }) => theme.colors['dark-grey']} transparent;
        border-width: 0 0.5rem 0.4rem;
        position: absolute;
        top: -1px;
    }

    &[data-popper-placement*="bottom"] > ${ToggletipArrow}::after {
        border-color: transparent transparent ${({ theme }) => theme.colors.white} transparent;
        border-width: 0 0.5rem 0.4rem;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow} {
        bottom: 0;
        height: 1rem;
        left: 0;
        margin-bottom: -1rem;
        width: 1rem;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow}::before {
        border-color: ${({ theme }) => theme.colors['dark-grey']} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0;
        position: absolute;
        top: 1px;
    }

    &[data-popper-placement*="top"] > ${ToggletipArrow}::after {
        border-color: ${({ theme }) => theme.colors.white} transparent transparent transparent;
        border-width: 0.4rem 0.5rem 0;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow} {
        height: 1rem;
        left: 0;
        margin-left: -0.7rem;
        width: 1rem;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow}::before {
        border-color: transparent ${({ theme }) => theme.colors['dark-grey']} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
    }

    &[data-popper-placement*="right"] > ${ToggletipArrow}::after {
        border-color: transparent ${({ theme }) => theme.colors.white} transparent transparent;
        border-width: 0.5rem 0.4rem 0.5rem 0;
        left: 0.375rem;
        top: 0;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow} {
        height: 1rem;
        margin-right: -0.7rem;
        right: 0;
        width: 1rem;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow}::before {
        border-color: transparent transparent transparent ${({ theme }) => theme.colors['dark-grey']};
        border-width: 0.5rem 0 0.5rem 0.4rem;
    }

    &[data-popper-placement*="left"] > ${ToggletipArrow}::after {
        border-color: transparent transparent transparent ${({ theme }) => theme.colors.white};
        border-width: 0.5rem 0 0.5rem 0.4rem;
        left: 0.25rem;
        top: 0;
    }
`;

export type ToggletipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface ToggletipProps {
    label?: string,
    iconName?: IconName,
    children?: ReactNode | ReactNode[];
    className?: string;
    /** Set toggletip open by default */
    defaultOpen?: boolean;
    /**
     * Toggletip placement on desktop (always top on mobile)
     * @default right
     */
    desktopPlacement?: ToggletipPlacement;
    disabled?: boolean;
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

export const Toggletip: FunctionComponent<ToggletipProps> = ({
    label,
    iconName = 'info',
    children,
    className,
    defaultOpen = false,
    disabled,
    desktopPlacement = 'right',
    invertedIcon = false,
}) => {
    const { isMobile } = useDeviceContext();
    const [isVisible, setVisible] = useState(defaultOpen);
    const toggletipId = useMemo(uuid, []);

    const {
        visible,
        setTooltipRef,
        setTriggerRef,
        getTooltipProps,
        getArrowProps,
    } = usePopperTooltip({
        defaultVisible: defaultOpen,
        placement: isMobile ? 'top' : desktopPlacement,
        trigger: 'click',
        visible: disabled ? false : isVisible,
        closeOnOutsideClick: false,
    }, { modifiers });

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
            />

            {isVisible && (
                <ToggletipContainer
                    data-testid="toggletip-content-container"
                    isMobile={isMobile}
                    id={toggletipId}
                    ref={setTooltipRef}
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
