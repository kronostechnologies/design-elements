import React, { FunctionComponent, PropsWithChildren, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { menuDimensions } from '../../tokens/menuDimensions';
import { Button, ButtonType } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { Icon, IconName } from '../icon/icon';
import { Menu, MenuItem } from '../menu/menu';
import { eventIsInside } from '../../utils/events';
import { useTranslation } from '../../i18n/use-translation';

export type MenuPlacement = 'right' | 'left';

const StyledContainer = styled.div`
    position: relative;
`;

const StyledMenu = styled(Menu)`
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
    position: absolute;
    ${({ $placement }) => ($placement === 'left' ? 'right: 0;' : 'left: 0;')}
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

export interface MenuButtonProps {
    autofocus?: boolean;
    buttonType: ButtonType;
    className?: string;
    defaultOpen?: boolean;
    iconName?: IconName;
    iconLabel?: string;
    inverted?: boolean;
    options: MenuItem[];
    onMenuVisibilityChanged?(isOpen: boolean): void;
    menuPlacement?: MenuPlacement;
}

export const MenuButton: FunctionComponent<PropsWithChildren<MenuButtonProps>> = ({
    autofocus,
    buttonType,
    children,
    className,
    defaultOpen,
    iconName,
    iconLabel,
    inverted,
    options,
    onMenuVisibilityChanged,
    menuPlacement = 'right',
}) => {
    const { t } = useTranslation('menu-button');

    const [visible, setVisible] = useState(!!defaultOpen);
    const [initialFocusIndex, setInitialFocusIndex] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Hide menu when user clicks outside container
     * @type {() => void}
     */
    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, containerRef.current);
        if (visible && clickIsOutside) {
            setVisible(false);
        }
    }, [containerRef, visible, setVisible]);

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

    /**
     * Set focus on first menu item conditionally
     * depending on whether it's a keypress, or a mouse event
     * @type {() => void}
     */
    const handleClickInside = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setVisible(!visible);
        // event.detail returns an integer, indicating how many clicks there were
        // If it's 0, no click was made and onClick was fired by a keypress
        const focusIndex = event.detail === 0 ? 0 : -1;
        setInitialFocusIndex(focusIndex);
    }, [visible]);

    /**
     * Hide menu when option is clicked
     * @type {() => void}
     */
    const handleOnOptionSelect: () => void = useCallback(() => {
        if (!visible) {
            buttonRef.current?.focus();
        } else {
            buttonRef.current?.blur();
        }
        setVisible(!visible);
    }, [visible, setVisible]);

    useEffect(() => {
        onMenuVisibilityChanged?.(visible);
    }, [visible, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <StyledContainer
            className={className}
            ref={containerRef}
            onKeyDown={handleTabKeyDown}
        >
            {iconName ? (
                <IconButton
                    ref={buttonRef}
                    autofocus={autofocus}
                    data-testid="menu-button"
                    type="button"
                    label={iconLabel ?? t('buttonAriaLabel')}
                    aria-haspopup="menu"
                    aria-expanded={visible}
                    buttonType={buttonType}
                    inverted={inverted}
                    iconName={iconName}
                    onClick={handleClickInside}
                />
            ) : (
                <Button
                    ref={buttonRef}
                    autofocus={autofocus}
                    data-testid="menu-button"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={visible}
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
            )}
            {visible && (
                <StyledMenu
                    $placement={menuPlacement}
                    options={options}
                    initialFocusIndex={initialFocusIndex}
                    onOptionSelect={handleOnOptionSelect}
                />
            )}
        </StyledContainer>
    );
};
