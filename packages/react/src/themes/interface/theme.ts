import { Palette, ComponentTokens } from './';

type RefTokens = Palette;

export interface Theme {
    ref: RefTokens;
    component: ComponentTokens;
}
