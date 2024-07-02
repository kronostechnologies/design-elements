import { RouteLink } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { TableDataType, UserView } from '../../types';
import { useUserContext } from '../../UsersProvider.component';

export interface ActionCellsProps {
    id: TableDataType['id'];
}

export const NameCell: FunctionComponent<ActionCellsProps> = (
    { id },
) => {
    const user = useUserContext(id);

    return (
        <RouteLink
            label={user?.name}
            href={`/user/${UserView.VIEW}/${user?.id}`}
            routerLink={NavLink}
        />
    );
};
