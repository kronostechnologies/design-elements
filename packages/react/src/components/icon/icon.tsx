import { type FC } from 'react';
import {
    AlertCircle,
    AlertOctagon,
    AlertTriangle,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Bell,
    Building,
    Calendar,
    CalendarPlus2,
    ChartNoAxesColumn,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronsLeft,
    ChevronsRight,
    ChevronsUpDown,
    Circle,
    CircleArrowDown,
    CircleArrowUp,
    Copy,
    Download,
    ExternalLink,
    EyeOff,
    Eye,
    Files,
    FileText,
    FolderOpen,
    Grip,
    HelpCircle,
    History,
    Home,
    Info,
    Lightbulb,
    Link,
    List,
    Lock,
    Mail,
    MapPin,
    Maximize2,
    Megaphone,
    Menu,
    Minus,
    MoreHorizontal,
    MoreVertical,
    PanelRightClose,
    PanelRightOpen,
    Pencil,
    Phone,
    Plus,
    RefreshCw,
    Search,
    Send,
    Settings,
    Share,
    Share2,
    Shield,
    Star,
    Table,
    Trash2,
    Unlink,
    Unlock,
    UploadCloud,
    User,
    Users,
    X,
} from 'lucide-react';
import AlertFilled from '../../icons/alert-filled.svg';
import WarningFilled from '../../icons/warning-filled.svg';
import Equisoft from '../../logos/logo-equisoft-ico.svg';

const iconMapping = {
    alertCircle: AlertCircle,
    alertFilled: AlertFilled,
    alertTriangle: AlertTriangle,
    alertOctagon: AlertOctagon,
    arrowDown: ArrowDown,
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    arrowUp: ArrowUp,
    arrowDownCircle: CircleArrowDown,
    arrowUpCircle: CircleArrowUp,
    bell: Bell,
    bento: Grip,
    calendar: Calendar,
    calendarAdd: CalendarPlus2,
    check: Check,
    checkCircle: CheckCircle,
    chevronDown: ChevronDown,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    chevronUp: ChevronUp,
    chevronsLeft: ChevronsLeft,
    chevronsRight: ChevronsRight,
    circle: Circle,
    copy: Copy,
    download: Download,
    edit: Pencil,
    equisoft: Equisoft,
    externalLink: ExternalLink,
    export: Share,
    eye: Eye,
    eyeOff: EyeOff,
    files: Files,
    fileText: FileText,
    graph: ChartNoAxesColumn,
    helpCircle: HelpCircle,
    history: History,
    home: Home,
    info: Info,
    link: Link,
    lightbulb: Lightbulb,
    list: List,
    lock: Lock,
    mail: Mail,
    mapPin: MapPin,
    maximize: Maximize2,
    megaphone: Megaphone,
    menu: Menu,
    minus: Minus,
    moreHorizontal: MoreHorizontal,
    moreVertical: MoreVertical,
    organization: Building,
    open: FolderOpen,
    panelLeft: PanelRightOpen,
    panelRight: PanelRightClose,
    panelRightClose: PanelRightClose,
    panelRightOpen: PanelRightOpen,
    phone: Phone,
    plus: Plus,
    plusSign: Plus,
    reorder: ChevronsUpDown,
    search: Search,
    send: Send,
    settings: Settings,
    share: Share2,
    shield: Shield,
    star: Star,
    table: Table,
    transfer: RefreshCw,
    trash: Trash2,
    unlink: Unlink,
    unlock: Unlock,
    uploadCloud: UploadCloud,
    user: User,
    users: Users,
    warningFilled: WarningFilled,
    x: X,
} as const;

export type IconName = keyof typeof iconMapping;

export interface IconProps {
    className?: string;
    /** Name of the icon, has to be in IconName */
    name: IconName;
    focusable?: boolean;
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

export const Icon: FC<IconProps> = ({
    className,
    name,
    size = '24',
    color = 'currentColor',
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
