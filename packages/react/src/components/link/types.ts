import { AnchorHTMLAttributes } from 'react';
import { NavLink, Link as ReactRouterLink, NavLinkProps } from 'react-router-dom';
import { ButtonProps } from '../buttons/types';
import { IconName } from '../icon/icon';

type BaseLinkProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>,
    | 'id'
    | 'className'
    | 'onClick'
    | 'aria-disabled'
    | 'aria-label'
    | 'target'
    | 'children'
    | 'href'
    | 'rel'
    | 'onFocus'
    | 'onBlur'
    | 'onKeyDown'
> & Pick<NavLinkProps, 'end'>;

type LinkButtonProps = Pick<ButtonProps,
    | 'autofocus'
    | 'buttonType'
    | 'disabled'
    | 'focusable'
    | 'inverted'
    | 'size'
    | 'title'
    | 'type'
>;

export interface LinkProps extends BaseLinkProps {
    buttonProps?: LinkButtonProps;
    iconOnly?: boolean;
    disabled?: boolean;
    external?: boolean;
    iconName?: IconName;
    label?: string;
    routerLink: typeof NavLink | typeof ReactRouterLink;
}
