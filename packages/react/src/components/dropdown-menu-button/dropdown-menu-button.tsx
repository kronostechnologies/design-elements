import React, {
    KeyboardEvent,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Theme } from '../../themes';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconProps } from '../icon/icon';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { ExternalItemProps, GroupItemProps, NavItemProps } from '../dropdown-menu/list-items';
import { getRootDocument } from '../../utils/dom';
import { AvatarProps } from '../avatar/avatar';

const StyledNav = styled.nav`
    position: relative;
`;

interface StyledButtonProps {
    theme: Theme;
    expanded: boolean;
    removePadding?: boolean;
}

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    background-color: ${({ expanded, theme }) => (expanded ? theme.main['primary-3'] : 'transparent')};
    border-color: transparent;
    color: ${({ theme }) => theme.greys.white};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    ${({ removePadding }) => (removePadding ? 'padding: 0;' : '')}

    text-transform: unset;

    &:hover {
        background-color: ${({ theme }) => theme.main['primary-3']};
    }
`;

const StyledRightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

const Prefix = styled.span`
    color: ${({ theme }) => theme.greys['mid-grey']};
    font-size: 0.875rem;
    margin-right: var(--spacing-1x);
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
    max-width: 350px;
    min-width: 200px;
    right: 0;
    width: initial;
`;

interface MenuButtonProps {
    label?: string;
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    children?: ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
    className?: string;
    /**
     * Sets menu open by default
     * @default false
     * */
    defaultOpen?: boolean;
    /**
     * Sets chevron icon
     * @default true
     * */
    hasCaret?: boolean;
    icon?: ReactElement<IconProps | AvatarProps>;
    id?: string;
    prefix?: string;
}

export function DropdownMenuButton({
    label,
    ariaLabel,
    children,
    className,
    defaultOpen = false,
    hasCaret = true,
    icon,
    prefix,
    id: providedId,
}: MenuButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [isOpen, setOpen] = useState(defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navMenuRef.current);
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (children) {
            const groups = Array.isArray(children) ? children : [children];
            const flatItems = groups.reduce(
                (items: ReactElement<NavItemProps | ExternalItemProps>[], { props }) => (
                    items.concat(Array.isArray(props.children) ? props.children : [props.children])
                ), [],
            ).filter(({ props }) => !!props.id);
            const { props: firstItemProps } = flatItems[0];
            document.getElementById(firstItemProps.id)?.focus();
        }
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside, isOpen, children]);

    function handleNavMenuKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            setTimeout(() => {
                const focusedElement = getRootDocument(navRef.current)?.activeElement;
                const isFocusInsideNav = navRef.current?.contains(focusedElement || null);

                if (!isFocusInsideNav) {
                    setOpen(false);
                }
            });
        }
    }

    return (
        <StyledNav ref={navRef} className={className} id={id} aria-label={ariaLabel || t('ariaLabel')}>
            <StyledButton
                aria-expanded={isOpen}
                data-testid="menu-button"
                expanded={isOpen}
                isMobile={isMobile}
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
                type="button"
                removePadding={icon && !label && !prefix}
            >
                <>
                    {icon}
                    {prefix && <Prefix>{prefix}</Prefix>}
                    {label}
                    {hasCaret && (
                        <StyledRightIcon
                            aria-hidden="true"
                            name={isOpen ? 'chevronUp' : 'chevronDown'}
                            size="16"
                        />
                    )}
                </>
            </StyledButton>
            <StyledDropdownMenu
                ref={navMenuRef}
                data-testid="menu-dropdownMenu"
                onChange={() => setOpen(false)}
                onKeyDown={handleNavMenuKeyDown}
                hidden={!isOpen}
            >
                {children}
            </StyledDropdownMenu>
        </StyledNav>
    );
}
