import React, { ReactElement } from 'react';
import AlertTriangle from 'feather-icons/dist/icons/alert-triangle.svg';
import ArrowLeft from 'feather-icons/dist/icons/arrow-left.svg';
import Check from 'feather-icons/dist/icons/check.svg';
import ChevronDown from 'feather-icons/dist/icons/chevron-down.svg';
import ChevronUp from 'feather-icons/dist/icons/chevron-up.svg';
import Copy from 'feather-icons/dist/icons/copy.svg';
import Edit from 'feather-icons/dist/icons/edit-2.svg';
import HelpCircle from 'feather-icons/dist/icons/help-circle.svg';
import Home from 'feather-icons/dist/icons/home.svg';
import Info from 'feather-icons/dist/icons/info.svg';
import Mail from 'feather-icons/dist/icons/mail.svg';
import MapPin from 'feather-icons/dist/icons/map-pin.svg';
import Menu from 'feather-icons/dist/icons/menu.svg';
import MoreHorizontal from 'feather-icons/dist/icons/more-horizontal.svg';
import Open from '../../icons/open.svg';
import Phone from 'feather-icons/dist/icons/phone.svg';
import Search from 'feather-icons/dist/icons/search.svg';
import Trash from 'feather-icons/dist/icons/trash.svg';
import X from 'feather-icons/dist/icons/x.svg';

type IconName = 
    | 'alertTriangle' 
    | 'arrowLeft'
    | 'check'
    | 'chevronDown'
    | 'chevronUp'
    | 'copy'
    | 'edit'
    | 'helpCircle'
    | 'home'
    | 'info'
    | 'mail'
    | 'mapPin'
    | 'menu'
    | 'moreHorizontal'
    | 'open'
    | 'phone'
    | 'search'
    | 'trash'
    | 'x'
;

interface IconProps {
    /** Name of the icon, has to be in IconName */
    name: IconName;
    /**
     * size will affect both width and height
     * @default 24
     */
    size?: string;
    /** 
     * icon's color
     * @default currentColor
     */
    color?: string;
}

const iconMapping: { [key in IconName]: any } = {
    'alertTriangle': AlertTriangle,
    'arrowLeft': ArrowLeft,
    'check': Check,
    'chevronDown': ChevronDown,
    'chevronUp': ChevronUp,
    'copy': Copy,
    'edit': Edit,
    'helpCircle': HelpCircle,
    'home': Home,
    'info': Info,
    'mail': Mail,
    'mapPin': MapPin,
    'menu': Menu,
    'moreHorizontal': MoreHorizontal,
    'open': Open,
    'phone': Phone,
    'search': Search,
    'trash': Trash,
    'x': X,
}

export function Icon({ name, size, ...props }: IconProps): ReactElement | null {
    const Component = iconMapping[name];

    return Component ? <Component height={size} width={size} {...props} /> : null;
}

Icon.defaultProps = {
    size: '24',
    color: 'currentColor'
};
