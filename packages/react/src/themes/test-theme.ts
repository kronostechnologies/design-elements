import { Theme } from '@design-elements/themes/theme';
import { greys } from './greys';
import { notifications } from './notifications';
import { tokens } from './tokens';

export const testTheme: Theme = {
    main: {
        'primary-1.1': '#9EB3FF',
        'primary-1.2': '#84B4E8',
        'primary-1.3': '#8984E8',
        'primary-2': '#282D40',
        'primary-3': '#8EA1E6',
        'secondary-4.1': '#B3974B',
        'secondary-4.2': '#736130',
        'secondary-4.3': '#FFD86B',
    },
    greys,
    notifications,
    tokens,
};
