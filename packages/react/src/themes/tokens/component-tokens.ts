import { AliasTokens } from './alias-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CardTokens, defaultCardTokens } from './component/card-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultGlobalHeaderTokens, GlobalHeaderTokens } from './component/global-header-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultLozengeTokens, LozengeTokens } from './component/lozenge-tokens';
import { defaultSideDrawerTokens, SideDrawerTokens } from './component/side-drawer-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | ButtonTokens
    | HeadingTokens
    | LabelTokens
    | FocusTokens
    | LozengeTokens
    | SideDrawerTokens
    | GlobalHeaderTokens
    | CardTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultButtonTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultFocusTokens,
    ...defaultLozengeTokens,
    ...defaultSideDrawerTokens,
    ...defaultGlobalHeaderTokens,
    ...defaultCardTokens
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
