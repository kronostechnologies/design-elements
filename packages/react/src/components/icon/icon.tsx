import AlertOctagon from 'feather-icons/dist/icons/alert-octagon.svg';
import AlertTriangle from 'feather-icons/dist/icons/alert-triangle.svg';
import ArrowDown from 'feather-icons/dist/icons/arrow-down.svg';
import ArrowLeft from 'feather-icons/dist/icons/arrow-left.svg';
import ArrowRight from 'feather-icons/dist/icons/arrow-right.svg';
import ArrowUp from 'feather-icons/dist/icons/arrow-up.svg';
import Calendar from 'feather-icons/dist/icons/calendar.svg';
import Check from 'feather-icons/dist/icons/check.svg';
import ChevronDown from 'feather-icons/dist/icons/chevron-down.svg';
import ChevronLeft from 'feather-icons/dist/icons/chevron-left.svg';
import ChevronRight from 'feather-icons/dist/icons/chevron-right.svg';
import ChevronUp from 'feather-icons/dist/icons/chevron-up.svg';
import ChevronsLeft from 'feather-icons/dist/icons/chevrons-left.svg';
import ChevronsRight from 'feather-icons/dist/icons/chevrons-right.svg';
import Copy from 'feather-icons/dist/icons/copy.svg';
import Edit from 'feather-icons/dist/icons/edit-2.svg';
import HelpCircle from 'feather-icons/dist/icons/help-circle.svg';
import Home from 'feather-icons/dist/icons/home.svg';
import Info from 'feather-icons/dist/icons/info.svg';
import Mail from 'feather-icons/dist/icons/mail.svg';
import MapPin from 'feather-icons/dist/icons/map-pin.svg';
import Menu from 'feather-icons/dist/icons/menu.svg';
import MoreHorizontal from 'feather-icons/dist/icons/more-horizontal.svg';
import MoreVertical from 'feather-icons/dist/icons/more-vertical.svg';
import Phone from 'feather-icons/dist/icons/phone.svg';
import PlusSign from 'feather-icons/dist/icons/plus.svg';
import Search from 'feather-icons/dist/icons/search.svg';
import Star from 'feather-icons/dist/icons/star.svg';
import Trash from 'feather-icons/dist/icons/trash.svg';
import X from 'feather-icons/dist/icons/x.svg';
import React, { VoidFunctionComponent } from 'react';
import Open from '../../icons/open.svg';
import Reorder from '../../icons/reorder.svg';

const iconMapping = {
    alertTriangle: AlertTriangle,
    alertOctagon: AlertOctagon,
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    calendar: Calendar,
    check: Check,
    chevronDown: ChevronDown,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronUp: ChevronUp,
    chevronsLeft: ChevronsLeft,
    chevronsRight: ChevronsRight,
    copy: Copy,
    edit: Edit,
    helpCircle: HelpCircle,
    home: Home,
    info: Info,
    mail: Mail,
    mapPin: MapPin,
    menu: Menu,
    moreHorizontal: MoreHorizontal,
    moreVertical: MoreVertical,
    open: Open,
    phone: Phone,
    plusSign: PlusSign,
    reorder: Reorder,
    search: Search,
    star: Star,
    trash: Trash,
    x: X,
} as const;

export type IconName = keyof typeof iconMapping;

interface IconProps {
    /** Name of the icon, has to be in IconName */
    name: IconName;
    /**
     * Size will affect both width and height
     * @default 24
     */
    size?: string;
    /**
     * Icon's color, in any format supported by css (keyword, rgb, hex, etc.)
     * @default currentColor
     */
    color?: string;
}

export const Icon: VoidFunctionComponent<IconProps> = ({
    name,
    size,
    color,
    ...props
}: IconProps) => {
    const Component = iconMapping[name];

    if (!Component) {
        return null;
    }

    return (
        <Component
            height={size}
            focusable={false}
            width={size}
            color={color}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};

Icon.defaultProps = {
    size: '24',
    color: 'currentColor',
};
