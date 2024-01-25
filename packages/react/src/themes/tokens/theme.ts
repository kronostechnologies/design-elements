import { AliasTokenMap, RefTokenMap, ComponentTokenMap, ResolvedComponentTokens } from './index';

export interface LegacyTheme {
    main: {
        'primary-1.1': string;
        'primary-1.2': string;
        'primary-1.3': string;
        'primary-1.4': string;
        'primary-2': string;
        'primary-3': string;
        'secondary-4.1': string;
        'secondary-4.2': string;
        'secondary-4.3': string;
    };
    greys: {
        'white': string;
        'neutral-90': string;
        'colored-white': string;
        'light-grey': string;
        'grey': string;
        'mid-grey': string;
        'dark-grey': string;
        'black': string;
    };
    notifications: {
        'info-1.1': string;
        'neutral-1.1': string;
        'discovery-1.1': string;
        'success-1.1': string;
        'success-1.2': string;
        'success-1.3': string;
        'alert-2.1': string;
        'alert-2.2': string;
        'warning-3.1': string;
        'warning-3.2': string;
        'warning-3.3': string;
        'warning-3.4': string;
    };
    tokens: {
        'focus-box-shadow': string;
        'focus-box-shadow-inset': string;
        'focus-border-box-shadow': string;
        'focus-border-box-shadow-inset': string;
        'focus-border': string;
        'modal-overlay-background-color': string;
        'overlay-box-shadow': string;
    };
}

export interface ThemeCustomization {
    main?: Partial<LegacyTheme['main']>;
    greys?: Partial<LegacyTheme['greys']>;
    notifications?: Partial<LegacyTheme['notifications']>;
    tokens?: Partial<LegacyTheme['tokens']>;
    ref?: Partial<RefTokenMap>;
    alias?: Partial<AliasTokenMap>;
    component?: Partial<ComponentTokenMap>;
}

export interface Theme {
    main: LegacyTheme['main'];
    greys: LegacyTheme['greys'];
    notifications: LegacyTheme['notifications'];
    tokens: LegacyTheme['tokens'];
    ref: RefTokenMap;
    alias: AliasTokenMap;
    component: ResolvedComponentTokens;
}
