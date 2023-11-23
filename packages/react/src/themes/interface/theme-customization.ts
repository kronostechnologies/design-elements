import { Palette } from './palette';
import { ComponentTokens } from './component-tokens';

type RefTokensCustomization = Palette;

export interface ThemeCustomization {
    ref?: Partial<RefTokensCustomization>;
    component?: Partial<ComponentTokens>;
}
