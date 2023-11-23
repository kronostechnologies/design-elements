import { CommonTypes } from './common-types';
import { ComponentTokens } from './component-tokens';

type RefTokensCustomization = CommonTypes['Palette'];

export interface ThemeCustomization {
    ref?: Partial<RefTokensCustomization>;
    component?: Partial<ComponentTokens>;
}
