import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type AvatarTokens =
    | 'avatar-background-color'
    | 'avatar-text-color'

export type AvatarTokenValue = AliasTokens | RefTokens;

export type AvatarTokenMap = {
    [Token in AvatarTokens]: AvatarTokenValue;
};

export const defaultAvatarTokens: AvatarTokenMap = {
    'avatar-background-color': 'color-neutral-05',
    'avatar-text-color': 'color-neutral-65',
};
