import React, { KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useFirstRender } from '@design-elements/utils/first-render';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Listbox, Option } from '../listbox/listbox';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Container = styled.div`
    position: relative;
    width: fit-content;
`;

const StyledButton = styled(AbstractButton)<{ theme: Theme, expanded: boolean }>`
    background-color: ${({ expanded, theme }) => expanded ? theme.main['primary-3'] : 'transparent'};
    border-color: transparent;
    color: ${({ theme }) => theme.greys.white};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;

    &:hover {
        background-color: ${({ theme }) => theme.main['primary-3']};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: transparent;
            color: ${({ theme }) => theme.greys['mid-grey']};
        }
    }
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

const StyledListbox = styled(Listbox)`
    max-width: 350px;
    min-width: 200px;
    right: 0;
    width: initial;
`;

interface MenuButtonProps {
    /**
     * Sets menu open by default
     * @default false
     **/
    defaultOpen?: boolean;
    label: string;
    options: Option[];
}

export function MenuButton({ defaultOpen = false, label, options }: MenuButtonProps): ReactElement {
    const firstRender = useFirstRender();
    const { isMobile } = useDeviceContext();
    const [focusedValue, setFocusedValue] = useState('');
    const [isOpen, setOpen] = useState(defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!firstRender) {
            setFocusedValue(isOpen ? options[0].value : '');
        }

        document.addEventListener('mouseup', handleClickOutside);
        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [isOpen]);

    function handleClickOutside(event: MouseEvent): void {
        const clickIsOutside = (
            !buttonRef.current?.contains(event.target as Node) &&
            !listboxRef.current?.contains(event.target as Node)
        );
        const shouldClose = (listboxRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }

    function handleListboxKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }
    }

    return (
        <Container>
            <StyledButton
                aria-haspopup="true"
                aria-expanded={isOpen}
                data-testid="menu-button"
                expanded={isOpen}
                isMobile={isMobile}
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
                type="button"
            >
                {label}
                <StyledIcon name={isOpen ? 'chevronUp' : 'chevronDown'} size="16"/>
            </StyledButton>
            <StyledListbox
                autofocus={isOpen}
                data-testid="menu-listbox"
                dropdown
                focusedValue={focusedValue}
                menu
                onChange={() => setOpen(false)}
                onKeyDown={handleListboxKeyDown}
                options={options}
                ref={listboxRef}
                visible={isOpen}
            />
        </Container>
    );
}
