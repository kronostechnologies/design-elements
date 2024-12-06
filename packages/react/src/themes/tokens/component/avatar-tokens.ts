import type { ComponentTokenMap } from '../tokens';

export type AvatarToken =
    | 'avatar-background-color'
    | 'avatar-text-color'

export const defaultAvatarTokens: ComponentTokenMap<AvatarToken> = {
    'avatar-background-color': 'color-background-neutral-subtle',
    'avatar-text-color': 'color-content-subtle',
};
