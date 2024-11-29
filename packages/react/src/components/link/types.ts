import { AnchorHTMLAttributes } from 'react';
import { NavLink, Link as ReactRouterLink, NavLinkProps } from 'react-router-dom';
import { ButtonProps } from '../buttons';
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
    disabled?: boolean;

    /** Button Link Variant */
    button?: LinkButtonProps;

    /** External Link Variant */
    external?: boolean;

    /** Icon Only Variant (with a tooltip)
     *  Make sure to provide an icon name and a label (for the tooltip)
     */
    icon?: {
        name: IconName;
        label: string;
    };

    routerLink?: typeof NavLink | typeof ReactRouterLink;
}
