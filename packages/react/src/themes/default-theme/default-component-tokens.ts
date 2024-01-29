import { ComponentTokenMap } from '../tokens';
import {
    defaultButtonTokens,
    defaultHeadingTokens,
    defaultLabelTokens,
} from './default-component';

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultButtonTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
};
