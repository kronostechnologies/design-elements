export interface Theme { /* TODO remove main, greys and notifications props from theme when updating thematization */
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
        'brand-05': string;
        'brand-20': string;
        'brand-50': string;
        'brand-70': string;
        'brand-80': string;
        'accent-20': string;
        'accent-50': string;
        'accent-70': string;
    };
    greys: {
        'white': string;
        'neutral-02': string;
        'neutral-05': string;
        'neutral-15': string;
        'neutral-30': string;
        'neutral-50': string;
        'neutral-65': string;
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
        'success-1.1': string;
        'success-1.2': string;
        'success-1.3': string;
        'alert-2.1': string;
        'alert-2.2': string;
        'warning-3.1': string;
        'warning-3.2': string;
        'warning-3.3': string;
        'warning-3.4': string;
        'success-05': string;
        'success-20': string;
        'success-50': string;
        'success-70': string;
        'alert-05': string;
        'alert-20': string;
        'alert-50': string;
        'alert-70': string;
        'warning-05': string;
        'warning-20': string;
        'warning-50': string;
        'warning-70': string;
        'informative-05': string;
        'informative-20': string;
        'informative-50': string;
        'informative-70': string;
    };
    size: string;
    tokens: {
        size: string;
        greys: {
            'white': string;
            'neutral-02': string;
            'neutral-05': string;
            'neutral-15': string;
            'neutral-30': string;
            'neutral-50': string;
            'neutral-65': string;
            'neutral-90': string;
            'black': string;
        };
        main: {
            'brand-05': string;
            'brand-20': string;
            'brand-50': string;
            'brand-70': string;
            'brand-80': string;
            'accent-20': string;
            'accent-50': string;
            'accent-70': string;
        };
        notifications: {
            'success-05': string;
            'success-20': string;
            'success-50': string;
            'success-70': string;
            'alert-05': string;
            'alert-20': string;
            'alert-50': string;
            'alert-70': string;
            'warning-05': string;
            'warning-20': string;
            'warning-50': string;
            'warning-70': string;
            'informative-05': string;
            'informative-20': string;
            'informative-50': string;
            'informative-70': string;
        };
        'bt-primary': {
            bg: string;
            border: string;
            color: string;
            'hover-bg': string;
            'hover-border': string;
            'hover-color': string;
            'disabled-bg': string;
            'disabled-border': string;
            'disabled-color': string;
            'focus-bg': string;
            'focus-border': string;
            'focus-color': string;
            'inverted-bg': string;
            'inverted-border': string;
            'inverted-color': string;
            'inverted-hover-bg': string;
            'inverted-hover-border': string;
            'inverted-hover-color': string;
            'inverted-focus-bg': string;
            'inverted-focus-border': string;
            'inverted-focus-color': string;
            'inverted-disabled-bg': string;
            'inverted-disabled-border': string;
            'inverted-disabled-color': string;
        };
        'bt-secondary': {
            bg: string;
            border: string;
            color: string;
            'hover-bg': string;
            'hover-border': string;
            'hover-color': string;
            'disabled-bg': string;
            'disabled-border': string;
            'disabled-color': string;
            'focus-bg': string;
            'focus-border': string;
            'focus-color': string;
            'inverted-bg': string;
            'inverted-border': string;
            'inverted-color': string;
            'inverted-hover-bg': string;
            'inverted-hover-border': string;
            'inverted-hover-color': string;
            'inverted-focus-bg': string;
            'inverted-focus-border': string;
            'inverted-focus-color': string;
            'inverted-disabled-bg': string;
            'inverted-disabled-border': string;
            'inverted-disabled-color': string;
        };
        'bt-tertiary': {
            bg: string;
            border: string;
            color: string;
            'hover-bg': string;
            'hover-border': string;
            'hover-color': string;
            'disabled-bg': string;
            'disabled-border': string;
            'disabled-color': string;
            'focus-bg': string;
            'focus-border': string;
            'focus-color': string;
            'inverted-bg': string;
            'inverted-border': string;
            'inverted-color': string;
            'inverted-hover-bg': string;
            'inverted-hover-border': string;
            'inverted-hover-color': string;
            'inverted-focus-bg': string;
            'inverted-focus-border': string;
            'inverted-focus-color': string;
            'inverted-disabled-bg': string;
            'inverted-disabled-border': string;
            'inverted-disabled-color': string;
        };
        'bt-destructive': {
            bg: string;
            border: string;
            color: string;
            'hover-bg': string;
            'hover-border': string;
            'hover-color': string;
            'disabled-bg': string;
            'disabled-border': string;
            'disabled-color': string;
            'focus-bg': string;
            'focus-border': string;
            'focus-color': string;
            'inverted-bg': string;
            'inverted-border': string;
            'inverted-color': string;
            'inverted-hover-bg': string;
            'inverted-hover-border': string;
            'inverted-hover-color': string;
            'inverted-focus-bg': string;
            'inverted-focus-border': string;
            'inverted-focus-color': string;
            'inverted-disabled-bg': string;
            'inverted-disabled-border': string;
            'inverted-disabled-color': string;
        };
        'bt-search': {
            bg: string;
            border: string;
            color: string;
            'hover-bg': string;
            'hover-color': string;
            'disabled-bg': string;
            'disabled-border': string;
            'disabled-color': string;
        };
        'focus-box-shadow': string;
        'focus-border-box-shadow': string;
        'focus-border-box-shadow-inset': string;
        'focus-border': string;
        'modal-overlay-background-color': string;
        'overlay-box-shadow': string;
    };
}
