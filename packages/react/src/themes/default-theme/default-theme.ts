import { ThemeCustomization } from '../tokens/theme';
import { defaultAliasTokens } from './default-alias-tokens';
import { defaultComponentTokens } from './default-component-tokens';
import { defaultRefTokens } from './default-ref-tokens';

export const defaultTheme: ThemeCustomization = {
    ref: defaultRefTokens,
    alias: defaultAliasTokens,
    component: defaultComponentTokens,
};
