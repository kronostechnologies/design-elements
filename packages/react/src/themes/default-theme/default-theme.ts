import { ThemeCustomization } from '../tokens/theme';
import { aliasTokens } from './alias-tokens';
import { componentTokens } from './component-tokens';
import { refTokens } from './ref-tokens';

export const defaultTheme: ThemeCustomization = {
    ref: refTokens,
    alias: aliasTokens,
    component: componentTokens,
};
