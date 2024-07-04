import { RouteLink } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../../../types';
import { useUserContext } from '../../../Provider.component';

export interface ActionCellsProps {
    id: User['id'];
}

export const NameCell: FunctionComponent<ActionCellsProps> = (
    { id },
) => {
    const user = useUserContext(id);

    return (
        <RouteLink
            label={user?.name}
            href={`/user/${user?.id}`}
            routerLink={NavLink}
        />
    );
};
