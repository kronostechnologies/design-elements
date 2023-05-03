import { FunctionComponent, KeyboardEvent, PropsWithChildren, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { menuDimensions } from '../../tokens/menuDimensions';
import { Button, ButtonType } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { Icon, IconName } from '../icon/icon';
import { Menu, MenuOption } from '../menu/menu';
import { eventIsInside } from '../../utils/events';

const StyledContainer = styled.div`
    position: relative;
`;

const StyledMenu = styled(Menu)`
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
    position: absolute;
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

interface Props {
    autofocus?: boolean;
    buttonType: ButtonType;
    className?: string;
    defaultOpen?: boolean;
    iconName?: IconName;
    inverted?: boolean;
    options: MenuOption[];
    onMenuVisibilityChanged?(isOpen: boolean): void;
}

export const MenuButton: FunctionComponent<PropsWithChildren<Props>> = ({
    autofocus,
    buttonType,
    children,
    className,
    defaultOpen,
    iconName,
    inverted,
    options,
    onMenuVisibilityChanged,
}) => {
    const [visible, setVisible] = useState(!!defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, containerRef.current);

        if (visible && clickIsOutside) {
            setVisible(false);
        }
    }, [containerRef, visible, setVisible]);

    const handleClickWithin: () => void = useCallback(() => {
        setVisible(!visible);
        if (!visible) {
            buttonRef.current?.focus();
        } else {
            buttonRef.current?.blur();
        }
    }, [buttonRef, visible, setVisible]);

    useEffect(() => {
        onMenuVisibilityChanged?.(visible);
    }, [visible, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    function handleMenuKeyDown({ key }: KeyboardEvent): void {
        switch (key) {
            case 'Escape':
                buttonRef.current?.focus();
                setVisible(false);
                break;
            case 'Tab':
                setVisible(false);
                break;
        }
    }

    return (
        <StyledContainer className={className} ref={containerRef}>
            {iconName ? (
                <IconButton
                    ref={buttonRef}
                    autofocus={autofocus}
                    data-testid="menu-button"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={visible}
                    buttonType={buttonType}
                    inverted={inverted}
                    iconName={iconName}
                    onClick={() => setVisible(!visible)}
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
                    onClick={() => handleClickWithin()}
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
                    options={options}
                    onKeyDown={handleMenuKeyDown}
                    onOptionSelect={() => handleClickWithin()}
                />
            )}
        </StyledContainer>
    );
};
