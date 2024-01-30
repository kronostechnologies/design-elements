import { ComponentTokenMap } from '../tokens';
import { buttonTokens } from './default-component/button-tokens';
import { focusTokens } from './default-component/focus-tokens';
import { headingTokens } from './default-component/heading-tokens';
import { labelTokens } from './default-component/label-tokens';

export const componentTokens: ComponentTokenMap = {
    ...buttonTokens,
    ...headingTokens,
    ...labelTokens,
    ...focusTokens,
};
