import { AliasTokenMap, RefTokenMap, ComponentTokenMap, ResolvedComponentTokens } from './tokens';

export interface ThemeCustomization {
    ref?: Partial<RefTokenMap>;
    alias?: Partial<AliasTokenMap>;
    component?: Partial<ComponentTokenMap>;
}

export interface ResolvedTheme {
    ref: RefTokenMap;
    alias: AliasTokenMap;
    component: ResolvedComponentTokens;
}
