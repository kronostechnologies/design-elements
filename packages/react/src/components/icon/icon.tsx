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
    Bold,
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
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    HelpCircle,
    Highlighter,
    History,
    Home,
    Image,
    Info,
    Italic,
    Lightbulb,
    Link,
    List,
    ListOrdered,
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
    RemoveFormatting,
    Search,
    Send,
    Settings,
    Share,
    Share2,
    Shield,
    Star,
    Strikethrough,
    Table,
    TextAlignEnd,
    TextAlignCenter,
    TextAlignJustify,
    TextAlignStart,
    TextQuote,
    Trash2,
    Type,
    Underline,
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
    bold: Bold,
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
    heading1: Heading1,
    heading2: Heading2,
    heading3: Heading3,
    heading4: Heading4,
    heading5: Heading5,
    heading6: Heading6,
    helpCircle: HelpCircle,
    highlighter: Highlighter,
    history: History,
    home: Home,
    image: Image,
    info: Info,
    italic: Italic,
    link: Link,
    lightbulb: Lightbulb,
    list: List,
    listOrdered: ListOrdered,
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
    removeFormatting: RemoveFormatting,
    reorder: ChevronsUpDown,
    search: Search,
    send: Send,
    settings: Settings,
    share: Share2,
    shield: Shield,
    star: Star,
    strikethrough: Strikethrough,
    table: Table,
    textAlignEnd: TextAlignEnd,
    textAlignCenter: TextAlignCenter,
    textAlignJustify: TextAlignJustify,
    textAlignStart: TextAlignStart,
    textQuote: TextQuote,
    transfer: RefreshCw,
    trash: Trash2,
    type: Type,
    underline: Underline,
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

Icon.displayName = 'Icon';
