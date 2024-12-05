import type { ComponentTokenMap } from '../tokens';

export type SideDrawerToken =
    'side-drawer-background-color' |
    'side-drawer-box-shadow-color';

export const defaultSideDrawerTokens: ComponentTokenMap<SideDrawerToken> = {
    'side-drawer-background-color': 'color-background-overlay',
    'side-drawer-box-shadow-color': 'color-box-shadow',
};
