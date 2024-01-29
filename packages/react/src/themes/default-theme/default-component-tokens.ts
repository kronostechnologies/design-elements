import { ComponentTokenMap } from '../tokens';
import {
    defaultButtonTokens, defaultFocusTokens,
    defaultHeadingTokens,
    defaultLabelTokens,
} from './default-component';

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultButtonTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultFocusTokens,
};
