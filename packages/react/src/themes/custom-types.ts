import { Theme } from './default-types';

export interface CustomTheme {
    ref?: Partial<Theme['ref']>;
    tokens?: Partial<Theme['tokens']>;
}
