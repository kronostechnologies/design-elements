import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SideDrawerTokens =
    'side-drawer-background-color' |
    'side-drawer-box-shadow-color';

export type SideDrawerTokensValue = AliasTokens | RefTokens;

export type SideDrawerTokensMap = {
    [Token in SideDrawerTokens]: SideDrawerTokensValue;
}

export const defaultSideDrawerTokens: SideDrawerTokensMap = {
    'side-drawer-background-color': 'color-white',
    'side-drawer-box-shadow-color': 'transparent-dark-10',
};
