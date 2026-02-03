import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/use-dropdown';
import { useTranslation } from '../../i18n/use-translation';
import { menuDimensions } from '../../legacy-constants/menuDimensions';
import { getRootElement } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { Button, type ButtonType, IconButton } from '../buttons';
import { Icon, type IconName } from '../icon';
import { Menu, type MenuItem } from '../menu';
import { Tooltip, type TooltipProps } from '../tooltip';

export type MenuPlacement = 'right' | 'left';

const StyledContainer = styled.div`
    position: relative;
`;

interface StyledMenuProps {
    $left?: string;
    $top?: string;
}

const StyledMenu = styled(Menu)<StyledMenuProps>`
    left: ${(props) => props.$left};
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
    position: absolute;
    top: ${(props) => props.$top};
    z-index: 99998;
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

export interface MenuButtonProps {
    autofocus?: boolean;
    buttonType: ButtonType;
    className?: string;
    defaultOpen?: boolean;
    disabled?: boolean;
    iconName?: IconName;
    iconLabel?: string;
    inverted?: boolean;
    menuPlacement?: MenuPlacement;
    options: MenuItem[];
    tooltip?: TooltipProps;

    onMenuVisibilityChanged?(isOpen: boolean): void;
}

export const MenuButton: FunctionComponent<PropsWithChildren<MenuButtonProps>> = ({
    autofocus,
    buttonType,
    children,
    className,
    defaultOpen,
    disabled,
    iconName,
    iconLabel,
    inverted,
    options,
    onMenuVisibilityChanged,
    menuPlacement = 'right',
    tooltip,
}) => {
    const { t } = useTranslation('menu-button');

    const [visible, setVisible] = useState(!!defaultOpen);
    const containerRef = useRef<HTMLDivElement>(null);

    const placement = menuPlacement === 'right' ? 'bottom-start' : 'bottom-end';
    const shadowRoot = useShadowRoot();
    const {
        x,
        y,
        refs: { reference: buttonRef, ...refs },
    } = useDropdown<HTMLButtonElement>({ open: visible, placement });
    const rootElement = getRootElement(shadowRoot);

    /**
     * Hide menu when user clicks outside container
     * @type {() => void}
     */
    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, containerRef.current, refs.floating.current);
        if (visible && clickIsOutside) {
            setVisible(false);
        }
    }, [refs.floating, visible]);

    /**
     * Close menu list item
     * whenever Tab key is or Escape keys are pressed
     * @param event
     */
    const handleTabKeyDown = (event: React.KeyboardEvent): void => {
        if (event.key === 'Tab' || event.key === 'Escape') {
            buttonRef.current?.focus();
            setVisible(false);
        }
    };

    const handleClickInside = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    /**
     * Hide menu when option is clicked
     */
    const handleOnOptionSelect: () => void = useCallback(() => {
        if (!visible) {
            buttonRef.current?.focus();
        } else {
            buttonRef.current?.blur();
        }
        setVisible(!visible);
    }, [visible, buttonRef]);

    useEffect(() => {
        onMenuVisibilityChanged?.(visible);
    }, [visible, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    const button = iconName ? (
        <IconButton
            ref={refs.setReference}
            autofocus={autofocus}
            data-testid="menu-button"
            type="button"
            label={iconLabel ?? t('buttonAriaLabel')}
            aria-haspopup="menu"
            aria-expanded={visible}
            disabled={disabled}
            buttonType={buttonType}
            inverted={inverted}
            iconName={iconName}
            onClick={handleClickInside}
        />
    ) : (
        <Button
            ref={refs.setReference}
            autofocus={autofocus}
            data-testid="menu-button"
            type="button"
            aria-haspopup="menu"
            aria-expanded={visible}
            disabled={disabled}
            buttonType={buttonType}
            inverted={inverted}
            onClick={handleClickInside}
        >
            {children}
            <StyledIcon
                aria-hidden="true"
                data-testid="chevron-icon"
                name={visible ? 'chevronUp' : 'chevronDown'}
                size="16"
            />
        </Button>
    );

    const wrappedButton = tooltip ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Tooltip {...tooltip}>{button}</Tooltip>
    ) : (
        button
    );

    return (
        <StyledContainer
            className={className}
            ref={containerRef}
            onKeyDown={handleTabKeyDown}
        >
            {wrappedButton}
            {visible && createPortal(
                <StyledMenu
                    ref={refs.setFloating}
                    options={options}
                    onOptionSelect={handleOnOptionSelect}
                    $left={`${x}px`}
                    $top={`${y}px`}
                />,
                rootElement,
            )}
        </StyledContainer>
    );
};

MenuButton.displayName = 'MenuButton';
