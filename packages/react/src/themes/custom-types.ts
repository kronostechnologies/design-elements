import { Theme } from './default-types';

export interface CustomTheme {
    ref?: Partial<Theme['ref']>;
    component?: Partial<Theme['component']>;
}
