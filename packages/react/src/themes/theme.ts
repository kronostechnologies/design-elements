import type {
    AliasToken,
    AliasTokenMap,
    ComponentToken,
    ComponentTokenMap,
    RefToken,
    RefTokenMap,
    ResolvedTokenMap,
} from './tokens';

export interface ThemeDeclaration {
    ref: RefTokenMap<RefToken>;
    alias: AliasTokenMap<AliasToken>;
    component: ComponentTokenMap<ComponentToken>;
}

export interface ThemeCustomization {
    ref?: Partial<RefTokenMap<RefToken>>;
    alias?: Partial<AliasTokenMap<AliasToken>>;
    component?: Partial<ComponentTokenMap<ComponentToken>>;
}

export interface ResolvedTheme {
    ref: ResolvedTokenMap<RefToken>;
    alias: ResolvedTokenMap<AliasToken>;
    component: ResolvedTokenMap<ComponentToken>;
}
