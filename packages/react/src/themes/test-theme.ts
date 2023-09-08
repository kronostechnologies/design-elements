import { greys } from './greys';
import { notifications } from './notifications';
import { Theme } from './theme';
import { tokens } from './tokens';
import { size } from './tokens';

export const testTheme: Theme = { /* TODO remove unused colors when updating thematization */
    main: {
        'primary-1.1': '#9EB3FF',
        'primary-1.2': '#84B4E8',
        'primary-1.3': '#8984E8',
        'primary-2': '#282D40',
        'primary-3': '#8EA1E6',
        'primary-1.4': '#E0F0F9',
        'secondary-4.1': '#B3974B',
        'secondary-4.2': '#736130',
        'secondary-4.3': '#FFD86B',
        'brand-05': '#E0F0F9',
        'brand-20': '#84C6EA',
        'brand-50': '#006296',
        'brand-70': '#003A5A',
        'brand-80': '#012639',
        'accent-20': '#F9B6B2',
        'accent-50': '#EF483E',
        'accent-70': '#D41F14',
    },
    greys,
    notifications,
    size,
    tokens,
};
