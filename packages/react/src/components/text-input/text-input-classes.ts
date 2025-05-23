import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'TextInput';

export interface TextInputClasses {
    control: string;
    leftAdornment: string;
    rightAdornment: string;
}

export type TextInputClassKeys = keyof TextInputClasses;

export const textInputClasses: TextInputClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'control',
        'leftAdornment',
        'rightAdornment',
    ],
);
