import {
    KeyboardEvent,
    KeyboardEventHandler,
    memo,
    MouseEventHandler,
    RefObject,
    useCallback,
    VoidFunctionComponent,
} from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { focus } from '../../utils/css-state';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { NavListOption } from './nav-list-option';

export interface ListOption extends NavListOption {
    id: string;
    focusIndex: number;
    ref: RefObject<HTMLAnchorElement>;
}

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const iconSize = '16';
const BaseIcon = styled(Icon).attrs({ size: iconSize })`
    color: ${({ theme }) => theme.colors['dark-grey']};
    min-width: ${iconSize}px;
`;

const StartIcon = styled(BaseIcon)`
    margin-right: var(--spacing-1x);
`;

const EndIcon = styled(BaseIcon)`
    margin-left: var(--spacing-1x);
`;

interface LinkProps {
    $device: DeviceContextProps;
    disabled?: boolean;
}

const linkStyles = css<LinkProps>`
    align-items: center;
    color: ${({ theme }) => theme.colors.black};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;

    ${(props) => focus(props, undefined, undefined, true)};

    :hover {
        background-color: ${({ theme }) => theme.colors.grey};

        ${BaseIcon} {
            color: ${({ theme }) => theme.colors.black};
        }
    }

    &[disabled] {
        color: ${({ theme }) => theme.colors['mid-grey']};
        pointer-events: none;
    }
`;

export const ReactRouterNavLink = styled(NavLink)<LinkProps & NavLinkProps>`
    ${linkStyles};
`;

export const HtmlLink = styled.a<LinkProps>`
    ${linkStyles};
`;

export interface NavListItemProps {
    option: ListOption;

    onKeyDown?(event: KeyboardEvent<HTMLAnchorElement>, option: NavListOption): void;

    onSelect?(option: NavListOption): void;
}

const LinkContent: VoidFunctionComponent<NavListItemProps> = memo<NavListItemProps>(
    ({ option }) => (
        <>
            {option.startIcon && <StartIcon data-testid="start-icon" name={option.startIcon} />}
            <Label>{option.label || option.value}</Label>
            {option.endIcon && <EndIcon data-testid="end-icon" name={option.endIcon} />}
        </>
    ),
    ({ option: prevOption }, { option }) => (
        prevOption.startIcon === option.startIcon && prevOption.label === option.label
        && prevOption.value === option.value && prevOption.endIcon === option.endIcon
    ),
);

interface WithTestId {
    testId: string;
}

const ScreenReaderMessage: VoidFunctionComponent<WithTestId> = ({ testId }) => {
    const { t } = useTranslation('common');

    return (
        <ScreenReaderOnlyText
            data-testid={`${testId}-screen-reader-text`}
            label={t('opensInNewTabScreenReader')}
        />
    );
};

export const NavListItem: VoidFunctionComponent<NavListItemProps> = ({
    option,
    onKeyDown,
    onSelect,
    ...rest
}) => {
    const device = useDeviceContext();
    const testId = `listitem-${option.value}-link`;
    const opensInNewTab = option.target === '_blank';
    const dataAttributes = useDataAttributes(rest);

    const handleOnClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
        onSelect?.(option);
        option.onClick?.(e);
    }, [onSelect, option]);

    const handleKeyDown: KeyboardEventHandler<HTMLAnchorElement> = useCallback((e) => {
        onKeyDown?.(e, option);
    }, [onKeyDown, option]);

    return (
        <li key={option.id} {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}>
            {option.isHtmlLink ? (
                <HtmlLink
                    data-testid={testId}
                    ref={option.ref}
                    $device={device}
                    href={option.disabled ? undefined : option.href}
                    disabled={option.disabled}
                    onClick={option.disabled ? undefined : handleOnClick}
                    onKeyDown={handleKeyDown}
                    target={option.target}
                >
                    <LinkContent option={option} />
                    {opensInNewTab && <ScreenReaderMessage testId={testId} />}
                </HtmlLink>
            ) : (
                <ReactRouterNavLink
                    data-testid={testId}
                    end={option.end}
                    ref={option.ref}
                    $device={device}
                    tabIndex={option.disabled ? -1 : 0}
                    to={option.href}
                    disabled={option.disabled}
                    onClick={option.disabled ? undefined : handleOnClick}
                    onKeyDown={handleKeyDown}
                    target={option.target}
                >
                    <LinkContent option={option} />
                    {opensInNewTab && <ScreenReaderMessage testId={testId} />}
                </ReactRouterNavLink>
            )}
        </li>
    );
};
