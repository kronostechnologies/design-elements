import {
    FunctionComponent,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent, PropsWithChildren,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { menuDimensions } from '../../legacy-constants/menuDimensions';
import { getRootDocument } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { ButtonType } from '../buttons/types';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { NavList } from '../nav-list/nav-list';
import { NavListOption } from '../nav-list/nav-list-option';

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

const StyledNavDropdown = styled(NavList)`
    max-width: ${menuDimensions.maxWidth};
    min-width: ${menuDimensions.minWidth};
    right: 0;
    width: initial;
`;

function getFirstFocusableElement(array: NavListOption[]): NavListOption {
    const focusableElements = array.filter((element) => !element.disabled);
    return focusableElements[0];
}

interface NavButtonProps {
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

export const DropdownNavigation: FunctionComponent<PropsWithChildren<NavButtonProps>> = ({
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

    useEffect(() => {
        onDropdownVisibilityChanged?.(isOpen);
    }, [isOpen, onDropdownVisibilityChanged]);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const NavListRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, NavListRef.current);
        const shouldClose = (NavListRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [isOpen]);

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
                const focusedElement = getRootDocument(navRef.current)?.activeElement;
                const isFocusInsideNav = navRef.current?.contains(focusedElement || null);

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

    const handleButtonClick = (event: ReactMouseEvent<HTMLButtonElement>): void => {
        const isKeyboardActivated = event.detail === 0;

        if (isKeyboardActivated) {
            setTimeout(() => {
                const firstFocusableElement = getFirstFocusableElement(options);
                setFocusedValue(firstFocusableElement.value);
            });
        }
        setOpen(!isOpen);
    };

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
                    ref={buttonRef}
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
                    ref={buttonRef}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                />
            )}
            <StyledNavDropdown
                data-testid="dropdown-navDropdown"
                focusedValue={focusedValue}
                onChange={handleOnLinkSelected}
                onKeyDown={handleNavDropdownKeyDown}
                options={options}
                ref={NavListRef}
                hidden={!isOpen}
            />
        </StyledDiv>
    );
};

DropdownNavigation.displayName = 'DropdownNavigation';
