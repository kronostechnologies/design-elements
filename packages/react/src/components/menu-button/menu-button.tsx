import { FunctionComponent, KeyboardEvent, PropsWithChildren, useState, useEffect } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';
import { menuDimensions } from '../../tokens/menuDimensions';
import { Button, ButtonType } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { Icon, IconName } from '../icon/icon';
import { Menu, MenuOption } from '../menu/menu';

const StyledMenu = styled(Menu)`
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
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
    const [controlledVisible, setControlledVisible] = useState(!!defaultOpen);
    const {
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        triggerRef,
        visible,
    } = usePopperTooltip({
        offset: [0, 0],
        placement: 'bottom-start',
        trigger: 'click',
        visible: controlledVisible,
        onVisibleChange: setControlledVisible,
    });

    useEffect(() => {
        onMenuVisibilityChanged?.(controlledVisible);
    }, [controlledVisible, onMenuVisibilityChanged]);

    function handleMenuKeyDown({ key }: KeyboardEvent): void {
        switch (key) {
            case 'Escape':
                setControlledVisible(false);
                triggerRef?.focus();
                break;
            case 'Tab':
                setControlledVisible(false);
                break;
        }
    }

    return (
        <div className={className}>
            {iconName ? (
                <IconButton
                    autofocus={autofocus}
                    data-testid="menu-button"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={visible}
                    buttonType={buttonType}
                    inverted={inverted}
                    iconName={iconName}
                    onClick={() => setControlledVisible(!controlledVisible)}
                    ref={setTriggerRef}
                />
            ) : (
                <Button
                    autofocus={autofocus}
                    data-testid="menu-button"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={visible}
                    buttonType={buttonType}
                    inverted={inverted}
                    onClick={() => setControlledVisible(!controlledVisible)}
                    ref={setTriggerRef}
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
                    initialFocusIndex={0}
                    options={options}
                    ref={setTooltipRef}
                    onKeyDown={handleMenuKeyDown}
                    onOptionSelect={() => setControlledVisible(false)}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...getTooltipProps({ className: 'tooltip-container' })}
                />
            )}
        </div>
    );
};
