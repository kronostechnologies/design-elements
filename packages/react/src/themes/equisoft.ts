import * as equisoftPalette from './default-theme';
import { Theme } from './interface';

const { palette, component } = equisoftPalette;

export const equisoftTheme: Theme = {
    ref: palette,
    component: component,
};
