import { FunctionComponent, PropsWithChildren } from 'react';
import { useTheme } from '../../hooks/use-theme';
import { Icon } from '../icon/icon';

export type SortState = 'ascending' | 'descending' | 'none';

export interface SortButtonIconProps {
    className?: string;
    sort: SortState;
}

export const SortButtonIcon: FunctionComponent<PropsWithChildren<SortButtonIconProps>> = ({ sort, className }) => {
    const theme = useTheme();

    switch (sort) {
        case 'ascending':
            return (
                <Icon
                    name="arrowDown"
                    size="16"
                    color={theme.component['table-sort-button-ascending-icon-color']}
                    className={className}
                />
            );
        case 'descending':
            return (
                <Icon
                    name="arrowUp"
                    size="16"
                    color={theme.component['table-sort-button-descending-icon-color']}
                    className={className}
                />
            );
        default:
            return (
                <Icon
                    name="reorder"
                    size="16"
                    color={theme.component['table-sort-button-default-icon-color']}
                    className={className}
                />
            );
    }
};

SortButtonIcon.displayName = 'SortButtonIcon';
