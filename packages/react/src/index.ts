// eslint-disable-next-line no-underscore-dangle, no-var, vars-on-top
declare global { var __DS_DEV__: boolean; }
// eslint-disable-next-line no-underscore-dangle
global.__DS_DEV__ = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

// Buttons
export { Button } from './components/buttons/button';
export { ButtonProps } from './components/buttons/types';
export { IconButton } from './components/buttons/icon-button';
export { NavListOption } from './components/nav-list/nav-list-option';
export { MenuButton, MenuButtonProps } from './components/menu-button/menu-button';
export { DropdownNavigation } from './components/dropdown-navigation/dropdown-navigation';
export { BentoMenuButton } from './components/bento-menu-button/bento-menu-button';
export { SegmentedControl } from './components/segmented-control/segmented-control';
export { ToggleButton, type ToggleButtonProps } from './components/buttons/toggle-button';

// Form Elements
export { Avatar } from './components/avatar/avatar';
export { Checkbox, CheckboxProps } from './components/checkbox/checkbox';
export { CheckboxGroup } from './components/checkbox-group/checkbox-group';
export { Combobox, ComboboxOption } from './components/combobox/combobox';
export { Datepicker, DatepickerHandles } from './components/date-picker/date-picker';
export { DropdownList } from './components/dropdown-list/dropdown-list';
export { DropdownListOption } from './components/dropdown-list/dropdown-list-option';
export * from './components/money-input';
export * from './components/numeric-input';
export { PasswordCreationInput } from './components/password-creation-input/password-creation-input';
export { PasswordInput } from './components/password-input/password-input';
export { PhoneInput } from './components/phone-input/phone-input';
export { ProgressCircular, ProgressCircularProps } from './components/progress-circular/progress-circular';
export { RadioButtonGroup } from './components/radio-button-group/radio-button-group';
export { SearchContextual } from './components/search/search-contextual';
export { SearchGlobal } from './components/search/search-global';
export { RadioButton } from './components/radio-button/radio-button';
export { StepperInput } from './components/stepper-input/stepper-input';
export { Tab, Tabs } from './components/tabs/tabs';
export { TextArea } from './components/text-area/text-area';
export * from './components/text-input';
export { ToggleSwitch } from './components/toggle-switch/toggle-switch';
export {
    hasALowerCaseLetter,
    hasAnUpperCaseLetter,
    hasMinLength as isLongEnough,
} from './components/password-creation-input/validation-condition';

// Context
export { ThemeWrapper } from './components/theme-wrapper/theme-wrapper';
export { DeviceContextProvider, useDeviceContext } from './components/device-context-provider/device-context-provider';
export { IntlProvider } from './components/internationalization-provider/internationalization-provider';

// Lists
export { Listbox, ListboxOption, ListboxProps } from './components/listbox/listbox';

// Miscellaneous
export * from './components/accordion';
export { Badge } from './components/badge/badge';
export { Card } from './components/card/card';
export { CardLink } from './components/card-link/card-link';
export * from './components/carousel/carousel';
export { ChooserButtonGroup, ChooserButtonOption } from './components/chooser-button-group/chooser-button-group';
export { ErrorSummary, ErrorMessage } from './components/error-summary/error-summary';
export { ExternalLink } from './components/external-link/external-link';
export { Heading } from './components/heading/heading';
export { GlobalHeader } from './components/global-header/global-header';
export { DropdownMenuButton } from './components/dropdown-menu-button/dropdown-menu-button';
export { Disclosure } from './components/disclosure/disclosure';
export { ExternalItemProps } from './components/dropdown-menu/list-items/external-item';
export { NavItemProps } from './components/dropdown-menu/list-items/nav-item';
export { Icon } from './components/icon/icon';
export { SectionalBanner, SectionalBannerType } from './components/sectional-banner/sectional-banner';
export * from './components/progress-tracker/progress-tracker';
export { SideDrawer } from './components/side-drawer/side-drawer';
export { Slider } from './components/slider/slider';
export { GlobalBanner, GlobalBannerType } from './components/global-banner/global-banner';
export * from './components/tooltip/tooltip';
export * from './components/toggletip/toggletip';
export * from './components/table';
export { Modal, ModalDialog } from './components/modal';
export {
    Tag, TagValue, TagColor, TagSize, TagProps,
} from './components/tag/tag';
export {
    ToggleTag, ToggleTagValue, ToggleTagSize, ToggleTagProps,
} from './components/tag/toggle-tag';
export { Lozenge, LozengeVariant } from './components/lozenge/lozenge';
export { RadioCard } from './components/radio-card-group/radio-card';
export { RadioCardGroup } from './components/radio-card-group/radio-card-group';
export { Status, StatusType } from './components/status/status';
export { SkipLink } from './components/skip-link/skip-link';
export { Spinner } from './components/spinner/spinner';
export { useModal } from './components/modal/use-modal';
export { UserProfile } from './components/user-profile/user-profile';
export { ToastType } from './components/toast/toast-type';
export { useToast } from './hooks/use-toast';

// Navigation
export { Breadcrumb, BreadcrumbElement } from './components/breadcrumb/breadcrumb';
export * from './components/global-navigation/global-navigation';
export { RouteLink } from './components/route-link/route-link';
export { Link } from './components/link';

// Results
export * from './components/legend/legend';
export { Fieldset } from './components/fieldset';
export { ProgressIndicator } from './components/progress-indicator/progress-indicator';
export { ProgressCircle } from './components/progress-circle/progress-circle';
export { Pagination } from './components/pagination/pagination';

// Themes
export { equisoftTheme, buildTheme } from './themes';
export { injectMainCss } from './styles';
export { ResolvedTheme as Theme, ThemeCustomization } from './themes/theme';

// Hooks
export { useTheme } from './hooks/use-theme';

export * from './components/design-system';
