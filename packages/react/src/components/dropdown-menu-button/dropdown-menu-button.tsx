import React, {
    KeyboardEvent,
    ReactElement, RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState, VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Theme } from '../../themes';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconProps } from '../icon/icon';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { GroupItemProps } from '../dropdown-menu/list-items';
import { getRootDocument } from '../../utils/dom';
import { AvatarProps } from '../avatar/avatar';
import { IconButton } from '../buttons/icon-button';

const StyledNav = styled.nav`
    position: relative;
`;

interface StyledButtonProps {
    theme: Theme;
    $expanded: boolean;
}

const buttonColors = css<StyledButtonProps>`
    background-color: ${({ $expanded, theme }) => ($expanded ? theme.main['primary-3'] : 'transparent')};
    border-color: ${({ $expanded, theme }) => ($expanded ? theme.main['primary-3'] : 'transparent')};
    color: ${({ theme }) => theme.greys.white};

    &:hover {
        background-color: ${({ theme }) => theme.main['primary-3']};
        border-color: ${({ theme }) => theme.main['primary-3']};
    }
`;

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    ${buttonColors}

    font-size: 0.875rem;
    font-weight: var(--font-normal);
    padding: 0 var(--spacing-half);
    text-transform: unset;
`;

const StyledIconButton = styled(IconButton).attrs({ buttonType: 'primary' })<StyledButtonProps>`
    ${buttonColors}
`;

const StyledRightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
    max-width: 350px;
    min-width: 200px;
    right: 0;
    width: initial;
`;

interface MenuButtonProps {
    label?: string;
    title?: string;
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    render?(close: () => void): ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
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
    firstItemRef?: RefObject<HTMLAnchorElement>;
    onMenuVisibilityChanged?(isOpen: boolean): void;
}

export const DropdownMenuButton: VoidFunctionComponent<MenuButtonProps> = ({
    label,
    title,
    ariaLabel,
    className,
    defaultOpen = false,
    hasCaret = true,
    icon,
    render,
    firstItemRef,
    onMenuVisibilityChanged,
    id: providedId,
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [isOpen, setOpen] = useState(defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const isIconOnly = icon && !label && !hasCaret;

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navMenuRef.current);
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        onMenuVisibilityChanged?.(isOpen);
    }, [isOpen, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        const removeEventListenerCallback = (): void => document.removeEventListener('mouseup', handleClickOutside);

        firstItemRef?.current?.focus();

        if (!isOpen) {
            return removeEventListenerCallback;
        }

        return removeEventListenerCallback;
    }, [handleClickOutside, isOpen, firstItemRef]);

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
            {!isIconOnly && (
                <StyledButton
                    aria-expanded={isOpen}
                    data-testid="menu-button"
                    $expanded={isOpen}
                    isMobile={isMobile}
                    onClick={() => setOpen(!isOpen)}
                    ref={buttonRef}
                    title={title}
                    type="button"
                >
                    {icon}
                    {label}
                    {hasCaret && (
                        <StyledRightIcon
                            aria-hidden="true"
                            name={isOpen ? 'chevronUp' : 'chevronDown'}
                            size="16"
                        />
                    )}
                </StyledButton>
            )}
            {isIconOnly && (
                <StyledIconButton
                    iconName="moreHorizontal"
                    aria-expanded={isOpen}
                    data-testid="menu-button"
                    $expanded={isOpen}
                    onClick={() => setOpen(!isOpen)}
                    ref={buttonRef}
                    title={title}
                    type="button"
                >
                    {icon}
                </StyledIconButton>
            )}
            <StyledDropdownMenu
                ref={navMenuRef}
                data-testid="menu-dropdownMenu"
                onKeyDown={handleNavMenuKeyDown}
                hidden={!isOpen}
            >
                {render?.(() => setOpen(false))}
            </StyledDropdownMenu>
        </StyledNav>
    );
};
