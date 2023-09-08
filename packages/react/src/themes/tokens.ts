import { Theme } from './theme';

/** TODO - adjust components to use correct color names as per below */
const greys = {
    white: '#FFFFFF',
    'neutral-02': '#FAFAFA',
    'neutral-05': '#F1F2F2',
    'neutral-15': '#DBDEE1',
    'neutral-30': '#B7BBC2',
    'neutral-50': '#878F9A',
    'neutral-65': '#60666E',
    'neutral-90': '#1B1C1E',
    black: '#000000',
};

const main = {
    'brand-05': '#E0F0F9',
    'brand-20': '#84C6EA',
    'brand-50': '#006296',
    'brand-70': '#003A5A',
    'brand-80': '#012639',
    'accent-20': '#F9B6B2',
    'accent-50': '#EF483E',
    'accent-70': '#D41F14',
};

const notifications = {
    'success-05': '#F6FCF8',
    'success-20': '#8ADDA9',
    'success-50': '#008533',
    'success-70': '#004F1E',
    'alert-05': '#FDF7F6',
    'alert-20': '#F99D99',
    'alert-50': '#CD2C23',
    'alert-70': '#7B1A15',
    'warning-05': '#FFFBF5',
    'warning-20': '#FFDD99',
    'warning-50': '#F5A200',
    'warning-70': '#9E6900',
    'informative-05': '#F9F7FB',
    'informative-20': '#CFC1E3',
    'informative-50': '#602FA0',
    'informative-70': '#3A1C60',
};

export const size = '1rem';

export const tokens: Theme['tokens'] = {
    greys,
    main,
    notifications,
    size,
    'focus-box-shadow': `0 0 0 2px ${main['brand-20']}`,
    'focus-border-box-shadow': ` 0 0 0 1px ${main['brand-50']}, 0 0 0 3px ${main['brand-20']}`,
    'focus-border-box-shadow-inset': `inset 0 0 0 2px ${main['brand-20']}, inset 0 0 0 3px ${main['brand-50']}`,
    'focus-border': `${main['brand-50']}`,
    'modal-overlay-background-color': 'rgba(0, 0, 0, 0.75)',
    'overlay-box-shadow': '0 10px 20px 0 rgba(0, 0, 0, 0.19)',
    'bt-primary': {
        bg: `${main['brand-50']}`,
        'inverted-bg': `${greys.white}`,
        border: `${main['brand-50']}`,
        'inverted-border': `${greys.white}`,
        color: `${greys.white}`,
        'inverted-color': `${main['brand-50']}`,

        'hover-bg': `${main['brand-70']}`,
        'inverted-hover-bg': `${greys.white}`,
        'hover-border': `${main['brand-70']}`,
        'inverted-hover-border': `${greys.white}`,
        'hover-color': `${greys.white}}`,
        'inverted-hover-color': `${main['brand-70']}`,

        'focus-bg': `${main['brand-50']}`,
        'inverted-focus-bg': `${greys.white}`,
        'focus-border': `${main['brand-50']}`,
        'inverted-focus-border': `${greys.white}`,
        'focus-color': `${greys.white}`,
        'inverted-focus-color': `${main['brand-50']}`,

        'disabled-bg': `${main['brand-20']}`,
        'inverted-disabled-bg': `${greys.white}`,
        'disabled-border': `${main['brand-20']}`,
        'inverted-disabled-border': `${greys.white}`,
        'disabled-color': `${greys.white}`,
        'inverted-disabled-color': `${main['brand-20']}`,
    },
    'bt-secondary': {
        bg: `${greys.white}`,
        'inverted-bg': 'transparent',
        border: `${main['brand-50']}`,
        'inverted-border': `${greys.white}`,
        color: `${main['brand-50']}`,
        'inverted-color': `${greys.white}`,

        'hover-bg': `${greys.white}`,
        'inverted-hover-bg': 'transparent',
        'hover-border': `${main['brand-70']}`,
        'inverted-hover-border': `${main['brand-20']}`,
        'hover-color': `${main['brand-70']}`,
        'inverted-hover-color': `${main['brand-20']}`,

        'focus-bg': `${greys.white}`,
        'inverted-focus-bg': `${main['brand-80']}`,
        'focus-border': `${main['brand-50']}`,
        'inverted-focus-border': `${main['brand-50']}`,
        'focus-color': `${main['brand-50']}`,
        'inverted-focus-color': `${greys.white}`,

        'disabled-bg': `${greys.white}`,
        'inverted-disabled-bg': 'transparent',
        'disabled-border': `${main['brand-20']}`,
        'inverted-disabled-border': `${main['brand-70']}`,
        'disabled-color': `${main['brand-20']}`,
        'inverted-disabled-color': `${main['brand-70']}`,
    },
    'bt-tertiary': {
        bg: 'transparent',
        'inverted-bg': 'transparent',
        border: 'transparent',
        'inverted-border': 'transparent',
        color: `${greys['neutral-65']}`,
        'inverted-color': `${greys.white}`,

        'hover-bg': `${greys['neutral-15']}`,
        'inverted-hover-bg': `${main['brand-70']}`,
        'hover-border': 'transparent',
        'inverted-hover-border': 'transparent',
        'hover-color': `${greys.black}`,
        'inverted-hover-color': `${greys.white}`,

        'focus-bg': `${greys.white}`,
        'inverted-focus-bg': `${main['brand-80']}`,
        'focus-border': `${main['brand-50']}`,
        'inverted-focus-border': `${main['brand-50']}`,
        'focus-color': `${greys['neutral-65']}`,
        'inverted-focus-color': `${greys.white}`,

        'disabled-bg': 'transparent',
        'inverted-disabled-bg': 'transparent',
        'disabled-border': 'transparent',
        'inverted-disabled-border': 'transparent',
        'disabled-color': `${greys['neutral-30']}`,
        'inverted-disabled-color': `${main['brand-70']}`,
    },
    'bt-destructive': {
        bg: `${notifications['alert-50']}`,
        'inverted-bg': `${greys.white}`,
        border: `${notifications['alert-50']}`,
        'inverted-border': `${greys.white}`,
        color: `${greys.white}`,
        'inverted-color': `${notifications['alert-50']}`,

        'hover-bg': `${notifications['alert-70']}`,
        'inverted-hover-bg': `${greys.white}`,
        'hover-border': `${notifications['alert-70']}`,
        'inverted-hover-border': `${greys.white}`,
        'hover-color': `${greys.white}`,
        'inverted-hover-color': `${notifications['alert-70']}`,

        'focus-bg': `${notifications['alert-50']}`,
        'inverted-focus-bg': `${greys.white}`,
        'focus-border': `${notifications['alert-20']}`,
        'inverted-focus-border': `${greys.white}`,
        'focus-color': `${greys.white}`,
        'inverted-focus-color': `${notifications['alert-20']}`,

        'disabled-bg': `${notifications['alert-20']}`,
        'inverted-disabled-bg': `${greys.white}`,
        'disabled-border': `${notifications['alert-20']}`,
        'inverted-disabled-border': `${greys.white}`,
        'disabled-color': `${greys.white}`,
        'inverted-disabled-color': `${notifications['alert-20']}`,
    },
    'bt-search': {
        bg: `${greys.white}`,
        border: `${greys['neutral-65']}`,
        color: `${greys['neutral-65']}`,
        'hover-bg': `${greys['neutral-15']}`,
        'hover-color': `${greys.black}`,
        'disabled-bg': `${greys['neutral-05']}`,
        'disabled-border': `${greys['neutral-15']}`,
        'disabled-color': `${greys['neutral-30']}`,
    },
};

/** This function sould go to the theme-directory */
function resolveVariables(value: any, tokens: Record<string, any>): any {
    if (typeof value === 'string' && value.startsWith('$')) {
        const tokenKey = value.substring(1); // Remove the $
        const [category, property] = tokenKey.split('.');
        if (property && tokens[category] && tokens[category][property]) {
            return tokens[category][property];
        } else if (tokens[tokenKey]) {
            return tokens[tokenKey];
        }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const resolvedObject: Record<string, any> = {};
        for (const key in value) {
            resolvedObject[key] = resolveVariables(value[key], tokens);
        }
        return resolvedObject;
    }
    return value;
}

// Updated mergeToken function to handle variables with $
function mergeToken(existingTokens: Record<string, any>, userOverrides: Record<string, any>): Record<string, any> {
    const mergedTokens: Record<string, any> = { ...existingTokens };

    for (const key in userOverrides) {
        if (existingTokens.hasOwnProperty(key) && typeof userOverrides[key] === 'object' && userOverrides[key] !== null && !Array.isArray(userOverrides[key])) {
            // If the value is an object, recursively merge it
            mergedTokens[key] = mergeToken(existingTokens[key], userOverrides[key]);
        } else {
            // Otherwise, use the user-provided value and resolve variables if needed
            mergedTokens[key] = resolveVariables(userOverrides[key], tokens);
        }
    }

    return mergedTokens;
}

/**
* User-provided JSON with token overrides. That is, the user can override any token value.
* Tokens are merged recursively, so only the values that are overridden need to be provided.
* We can use values or values as variables/tokens (variables/tokens are prefixed with $);
 */
const customeTokens = {
    "bt-primary": {
        "bg": "#D41F14",
        "color": "$greys.black",
        "font-size": "$size",
    },
};

// Here the tokens are merged
const newTokens = mergeToken(tokens, customeTokens);
console.log(tokens,  newTokens)

