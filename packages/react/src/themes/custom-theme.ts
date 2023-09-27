import { mergedTheme } from './merge-pallets';
import { CustomTheme } from './custom-types';
import { Theme } from './theme';
import { tokens } from './tokens';

const { main, greys, notifications } = mergedTheme;

export const customTheme: CustomTheme & Pick<Theme, 'tokens'> = {
    main,
    greys,
    notifications,
    tokens,
};
