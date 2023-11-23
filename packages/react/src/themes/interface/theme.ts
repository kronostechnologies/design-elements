import { CommonTypes } from './common-types';
import { ComponentTokens } from './component-tokens';

type RefTokens = CommonTypes['Palette'];

export interface Theme {
    ref: RefTokens;
    component: ComponentTokens;
}
