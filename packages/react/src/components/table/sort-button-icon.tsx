import { FunctionComponent, PropsWithChildren } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../icon/icon';

export type SortState = 'ascending' | 'descending' | 'none';

export interface SortButtonIconProps {
    sort: SortState;
}

export const SortButtonIcon: FunctionComponent<PropsWithChildren<SortButtonIconProps>> = ({ sort }) => {
    const theme = useTheme();

    switch (sort) {
        case 'ascending':
            return <Icon name="arrowDown" size="16" color={theme.component['sort-button-ascending-color']} />;
        case 'descending':
            return <Icon name="arrowUp" size="16" color={theme.component['sort-button-descending-color']} />;
        default:
            return <Icon name="reorder" size="16" color={theme.component['sort-button-default-color']} />;
    }
};
