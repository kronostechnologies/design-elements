import { VoidFunctionComponent } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../icon/icon';

export type SortState = 'ascending' | 'descending' | 'none';

export interface SortButtonIconProps {
    sort: SortState;
}

export const SortButtonIcon: VoidFunctionComponent<SortButtonIconProps> = ({ sort }) => {
    const theme = useTheme();

    switch (sort) {
        case 'ascending':
            return <Icon name="arrowDown" size="16" color={theme.greys['dark-grey']} />;
        case 'descending':
            return <Icon name="arrowUp" size="16" color={theme.greys['dark-grey']} />;
        default:
            return <Icon name="reorder" size="16" color={theme.greys['dark-grey']} />;
    }
};
