import { ThemeCustomization } from './interface/theme';
import {
    defaultAlias,
    defaultPalette, defaultTextAttributes,
    defaultTheme,
} from './default-theme';

export const equisoftTheme: ThemeCustomization = {
    ref: {
        ...defaultPalette,
        ...defaultTextAttributes,
    },
    alias: defaultAlias,
    component: defaultTheme.component,
};
