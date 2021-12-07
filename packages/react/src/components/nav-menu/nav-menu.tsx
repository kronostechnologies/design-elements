import {
    createRef,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    Ref,
    RefObject,
    useEffect,
    useMemo,
} from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Icon, IconName } from '../icon/icon';
import { v4 as uuid } from '../../utils/uuid';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { focus } from '../../utils/css-state';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { useTranslation } from '../../i18n/use-translation';

const List = styled.ul`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: ${({ theme }) => theme.tokens['overlay-box-shadow']};
    list-style-type: none;
    margin: 0;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    width: 100%;
`;

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const iconSize = '16';
const StartIcon = styled(Icon).attrs({ size: iconSize })`
    color: ${({ theme }) => theme.greys['dark-grey']};
    margin-right: var(--spacing-1x);
    min-width: ${iconSize}px;
`;

const EndIcon = styled(Icon).attrs({ size: iconSize })`
    color: ${({ theme }) => theme.greys['dark-grey']};
    margin-left: var(--spacing-1x);
    min-width: ${iconSize}px;
`;

interface LinkProps {
    $device: DeviceContextProps;
    disabled?: boolean;
}

const linkStyles = css<LinkProps>`
    align-items: center;
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;

    ${(props) => focus(props, undefined, undefined, true)}
    :hover {
        background-color: ${({ theme }) => theme.greys.grey};

        ${StartIcon},
        ${EndIcon} {
            color: ${({ theme }) => theme.greys.black};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.greys['mid-grey']};
        pointer-events: none;
    }
`;

export const ReactRouterNavLink = styled(NavLink)<LinkProps & NavLinkProps>`
    ${linkStyles};
`;

export const HtmlLink = styled.a<LinkProps>`
    ${linkStyles};
`;

export interface NavMenuOption {
    disabled?: boolean;
    endIcon?: IconName;
    exact?: boolean;
    href: string;
    isHtmlLink?: boolean;
    // Option label, if not provided will be set with value
    label?: string;
    startIcon?: IconName;
    target?: string;
    value: string;
    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

interface ListOption extends NavMenuOption {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLAnchorElement>;
}

export interface NavMenuProps {
    id?: string;
    options: NavMenuOption[];
    className?: string;
    /** Sets the current focused element in the menu */
    focusedValue?: string;
    hidden?: boolean;

    /** onChange callback function, invoked when an option is selected */
    onChange?(option: NavMenuOption): void;

    /** onKeyDown callback function, invoked when a key is pressed */
    onKeyDown?(event: KeyboardEvent): void;
    ordered?: boolean;
}

export const NavMenu = forwardRef(({
    className,
    id: providedId,
    options,
    focusedValue,
    hidden,
    onChange,
    onKeyDown,
    ordered,
}: NavMenuProps, ref: Ref<HTMLUListElement>): ReactElement => {
    const device = useDeviceContext();
    const { t } = useTranslation('common');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const list: ListOption[] = useMemo((): ListOption[] => options.map((option, index) => ({
        ...option,
        id: `${id}_${option.value}`,
        focused: false,
        focusIndex: index,
        ref: createRef<HTMLAnchorElement>(),
    })), [id, options]);

    useEffect(() => {
        if (focusedValue) {
            const currentOption = list.find((option) => option.value === focusedValue);
            currentOption?.ref.current?.focus();
        }
    }, [focusedValue, list]);

    function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, option: NavMenuOption): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.currentTarget.click();

            if (onChange) {
                onChange(option);
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    }

    return (
        <List
            as={ordered ? 'ol' : 'ul'}
            className={className}
            data-testid="menu-list"
            id={id}
            ref={ref}
            hidden={hidden}
        >
            {list.map((option) => {
                const testId = `listitem-${option.value}`;
                const opensInNewTab = option.target === '_blank';
                const label = (
                    <>
                        {option.startIcon && <StartIcon data-testid="start-icon" name={option.startIcon} />}
                        <Label>{option.label || option.value}</Label>
                        {option.endIcon && <EndIcon data-testid="end-icon" name={option.endIcon} />}
                    </>
                );

                function handleOnClick(e: MouseEvent<HTMLAnchorElement>): void {
                    onChange?.(option);
                    option.onClick?.(e);
                }

                function renderScreenReaderOnlyText(): ReactElement {
                    return (
                        <ScreenReaderOnlyText
                            data-testid={`${testId}-screen-reader-text`}
                            label={t('opensInNewTabScreenReader')}
                        />
                    );
                }

                return (
                    <li key={option.id}>
                        {option.isHtmlLink ? (
                            <HtmlLink
                                data-testid={testId}
                                ref={option.ref}
                                $device={device}
                                href={option.disabled ? undefined : option.href}
                                disabled={option.disabled}
                                onClick={option.disabled ? undefined : handleOnClick}
                                onKeyDown={(event) => handleKeyDown(event, option)}
                                target={option.target}
                            >
                                {label}
                                {opensInNewTab && renderScreenReaderOnlyText()}
                            </HtmlLink>
                        ) : (
                            <ReactRouterNavLink
                                data-testid={testId}
                                exact={option.exact}
                                innerRef={option.ref}
                                $device={device}
                                tabIndex={option.disabled ? -1 : 0}
                                to={option.href}
                                disabled={option.disabled}
                                onClick={option.disabled ? undefined : handleOnClick}
                                onKeyDown={(event) => handleKeyDown(event, option)}
                                target={option.target}
                            >
                                {label}
                                {opensInNewTab && renderScreenReaderOnlyText()}
                            </ReactRouterNavLink>
                        )}
                    </li>
                );
            })}
        </List>
    );
});

NavMenu.displayName = 'NavMenu';
