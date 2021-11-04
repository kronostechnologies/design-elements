import AlertOctagon from 'feather-icons/dist/icons/alert-octagon.svg';
import AlertTriangle from 'feather-icons/dist/icons/alert-triangle.svg';
import ArrowDown from 'feather-icons/dist/icons/arrow-down.svg';
import ArrowLeft from 'feather-icons/dist/icons/arrow-left.svg';
import ArrowRight from 'feather-icons/dist/icons/arrow-right.svg';
import ArrowUp from 'feather-icons/dist/icons/arrow-up.svg';
import Bell from 'feather-icons/dist/icons/bell.svg';
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
import ExternalLink from 'feather-icons/dist/icons/external-link.svg';
import Eye from 'feather-icons/dist/icons/eye.svg';
import HelpCircle from 'feather-icons/dist/icons/help-circle.svg';
import Home from 'feather-icons/dist/icons/home.svg';
import Info from 'feather-icons/dist/icons/info.svg';
import Mail from 'feather-icons/dist/icons/mail.svg';
import MapPin from 'feather-icons/dist/icons/map-pin.svg';
import Menu from 'feather-icons/dist/icons/menu.svg';
import Minus from 'feather-icons/dist/icons/minus.svg';
import MoreHorizontal from 'feather-icons/dist/icons/more-horizontal.svg';
import MoreVertical from 'feather-icons/dist/icons/more-vertical.svg';
import Phone from 'feather-icons/dist/icons/phone.svg';
import PlusSign from 'feather-icons/dist/icons/plus.svg';
import Search from 'feather-icons/dist/icons/search.svg';
import Settings from 'feather-icons/dist/icons/settings.svg';
import Star from 'feather-icons/dist/icons/star.svg';
import Transfer from 'feather-icons/dist/icons/refresh-cw.svg';
import Trash from 'feather-icons/dist/icons/trash-2.svg';
import User from 'feather-icons/dist/icons/user.svg';
import Users from 'feather-icons/dist/icons/users.svg';
import X from 'feather-icons/dist/icons/x.svg';
import React, { VoidFunctionComponent } from 'react';
import Bento from '../../icons/bento.svg';
import Contracts from '../../icons/contracts.svg';
import Equisoft from '../../logos/logo-equisoft-ico.svg';
import History from '../../icons/history.svg';
import Organization from '../../icons/organization.svg';
import Open from '../../icons/open.svg';
import Reorder from '../../icons/reorder.svg';
import Files from '../../icons/files.svg';

const iconMapping = {
    alertTriangle: AlertTriangle,
    alertOctagon: AlertOctagon,
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    bell: Bell,
    bento: Bento,
    calendar: Calendar,
    check: Check,
    chevronDown: ChevronDown,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronUp: ChevronUp,
    chevronsLeft: ChevronsLeft,
    chevronsRight: ChevronsRight,
    contracts: Contracts,
    copy: Copy,
    edit: Edit,
    equisoft: Equisoft,
    externalLink: ExternalLink,
    eye: Eye,
    files: Files,
    helpCircle: HelpCircle,
    history: History,
    home: Home,
    info: Info,
    mail: Mail,
    mapPin: MapPin,
    menu: Menu,
    minus: Minus,
    moreHorizontal: MoreHorizontal,
    moreVertical: MoreVertical,
    organization: Organization,
    open: Open,
    phone: Phone,
    plusSign: PlusSign,
    reorder: Reorder,
    search: Search,
    settings: Settings,
    star: Star,
    transfer: Transfer,
    trash: Trash,
    user: User,
    users: Users,
    x: X,
} as const;

export type IconName = keyof typeof iconMapping;

export interface IconProps {
    className?: string;
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
    role?: string;
}

export const Icon: VoidFunctionComponent<IconProps> = ({
    className,
    name,
    size,
    color,
    role,
    ...props
}: IconProps) => {
    const Component = iconMapping[name];

    if (!Component) {
        return null;
    }

    return (
        <Component
            className={className}
            height={size}
            focusable={false}
            width={size}
            color={color}
            role={role}
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};

Icon.defaultProps = {
    size: '24',
    color: 'currentColor',
};
