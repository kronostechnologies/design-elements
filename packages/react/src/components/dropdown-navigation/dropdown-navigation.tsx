import {
    FunctionComponent,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDropdown } from '../../hooks/use-dropdown';
import { useTranslation } from '../../i18n/use-translation';
import { menuDimensions } from '../../legacy-constants/menuDimensions';
import { activeElementIsInside, getRootDocument, getRootElement } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { Button, type ButtonType, IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName } from '../icon';
import { NavList, type NavListOption } from '../nav-list';

const StyledDiv = styled.div`
    position: relative;
`;

const StyledButton = styled(Button)<{ isMobile: boolean }>`
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;
`;

const StyledRightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

const StyledLeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

interface StyledNavListProps {
    $left?: string;
    $top?: string;
}

const StyledNavDropdown = styled(NavList)<StyledNavListProps>`
    left: ${(props) => props.$left};
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
    position: absolute;
    top: ${(props) => props.$top};
    width: initial;
    z-index: 99998;
`;

function getFirstFocusableElement(array: NavListOption[]): NavListOption {
    const focusableElements = array.filter((element) => !element.disabled);
    return focusableElements[0];
}

export interface DropdownNavigationProps {
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    autofocus?: boolean;
    tag?: 'div' | 'nav';
    buttonAriaLabel?: string;
    children?: ReactNode;
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
    iconName?: IconName;
    iconOnly?: boolean;
    id?: string;
    options: NavListOption[];
    title?: string;
    buttonType?: ButtonType;
    inverted?: boolean;

    onDropdownVisibilityChanged?(isOpen: boolean): void;

    onLinkSelected?(option: NavListOption): void;
}

export const DropdownNavigation: FunctionComponent<PropsWithChildren<DropdownNavigationProps>> = ({
    tag,
    ariaLabel,
    autofocus,
    buttonAriaLabel,
    buttonType = 'tertiary',
    children,
    className,
    defaultOpen = false,
    hasCaret = true,
    iconName,
    iconOnly = false,
    id: providedId,
    inverted = true,
    onLinkSelected,
    onDropdownVisibilityChanged,
    options,
    title,
    ...props
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('dropdown-navigation');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [focusedValue, setFocusedValue] = useState('');
    const [isOpen, setOpen] = useState(defaultOpen);
    const containerAriaLabel = tag === 'div' ? '' : ariaLabel || t('ariaLabel');
    const dataAttributes = useDataAttributes(props);
    const shadowRoot = useShadowRoot();
    const {
        x,
        y,
        refs: { reference: buttonRef, floating: navListRef, ...refs },
    } = useDropdown<HTMLButtonElement>({ open: isOpen, placement: 'bottom-end' });
    const rootElement = getRootElement(shadowRoot);

    useEffect(() => {
        onDropdownVisibilityChanged?.(isOpen);
    }, [isOpen, onDropdownVisibilityChanged]);

    const navRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navListRef.current);
        const shouldClose = (navListRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [navListRef, buttonRef, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setFocusedValue('');
        }

        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [handleClickOutside, isOpen]);

    const handleNavDropdownKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            setTimeout(() => {
                const focusedElement = getRootDocument(navListRef.current)?.activeElement;
                const isFocusInsideNav = navListRef.current?.contains(focusedElement || null);

                if (!isFocusInsideNav) {
                    setOpen(false);
                }
            });
        }
    };

    const handleOnLinkSelected: (option: NavListOption) => void = (option: NavListOption) => {
        onLinkSelected?.(option);
        setOpen(false);
    };

    const focusOnFirstFocusableElement = useCallback((): void => {
        const firstFocusableElement = getFirstFocusableElement(options);
        setFocusedValue(firstFocusableElement.value);
    }, [options]);

    const handleButtonClick = (event: ReactMouseEvent<HTMLButtonElement>): void => {
        const isKeyboardActivated = event.detail === 0;

        if (isKeyboardActivated) {
            focusOnFirstFocusableElement();
        }
        setOpen(!isOpen);
    };

    const handleButtonKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Tab' && isOpen && activeElementIsInside(buttonRef.current)) {
            event.preventDefault();
            focusOnFirstFocusableElement();
        }
    }, [buttonRef, focusOnFirstFocusableElement, isOpen]);

    return (
        <StyledDiv
            data-testid="nav-container"
            as={tag}
            ref={navRef}
            className={className}
            id={id}
            aria-label={containerAriaLabel}
        >
            {!iconOnly && (
                <StyledButton
                    aria-label={buttonAriaLabel}
                    aria-expanded={isOpen}
                    autofocus={autofocus}
                    data-testid="navigation-button"
                    isMobile={isMobile}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={refs.setReference}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...dataAttributes}
                >
                    {iconName && <StyledLeftIcon aria-hidden="true" name={iconName} size="16" />}
                    {children}
                    {hasCaret && (
                        <StyledRightIcon
                            aria-hidden="true"
                            name={isOpen ? 'chevronUp' : 'chevronDown'}
                            size="16"
                        />
                    )}
                </StyledButton>
            )}
            {iconOnly && iconName && (
                <IconButton
                    aria-label={buttonAriaLabel}
                    aria-expanded={isOpen}
                    autofocus={autofocus}
                    data-testid="navigation-button"
                    iconName={iconName}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={refs.setReference}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                />
            )}
            {isOpen && createPortal(
                <StyledNavDropdown
                    data-testid="dropdown-navDropdown"
                    focusedValue={focusedValue}
                    onChange={handleOnLinkSelected}
                    onKeyDown={handleNavDropdownKeyDown}
                    options={options}
                    ref={refs.setFloating}
                    $left={`${x}px`}
                    $top={`${y}px`}
                />,
                rootElement,
            )}
        </StyledDiv>
    );
};

DropdownNavigation.displayName = 'DropdownNavigation';
