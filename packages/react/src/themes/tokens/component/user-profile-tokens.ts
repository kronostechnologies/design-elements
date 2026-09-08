import type { ComponentTokenMap } from '../tokens';

export type UserProfileToken =
    | 'user-profile-background-color'
    | 'user-profile-text-color'
    | 'user-profile-inverted-background-color'
    | 'user-profile-inverted-text-color'

export const defaultUserProfileTokens: ComponentTokenMap<UserProfileToken> = {
    'user-profile-background-color': 'color-background-brand-bold',
    'user-profile-text-color': 'color-content-inverse',
    'user-profile-inverted-background-color': 'color-background-neutral-subtle',
    'user-profile-inverted-text-color': 'color-content-subtle',
};
