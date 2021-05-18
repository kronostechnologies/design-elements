import React, { FunctionComponent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Menu, MenuOption } from '../menu/menu';
import { Button, ButtonType } from '../buttons/button';
import { Icon } from '../icon/icon';

const StyledMenu = styled(Menu)`
    max-width: 350px;
    min-width: 200px;
    width: initial;
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

interface Props {
    buttonType: ButtonType;
    defaultOpen?: boolean;
    options: MenuOption[];
}

export const MenuButton: FunctionComponent<Props> = ({ buttonType, defaultOpen, options }) => {
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
        <div className="App">
            <Button
                data-testid="menu-button"
                type="button"
                aria-haspopup="menu"
                aria-expanded={visible}
                buttonType={buttonType}
                onClick={() => setControlledVisible(!controlledVisible)}
                ref={setTriggerRef}
            >
                Trigger
                <StyledIcon
                    ria-hidden="true"
                    data-testid="caret-icon"
                    name={visible ? 'chevronUp' : 'chevronDown'}
                    size="16"
                />
            </Button>
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
