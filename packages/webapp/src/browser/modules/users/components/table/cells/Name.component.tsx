import { RouteLink } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../../state';
import { User } from '../../../types';

interface NameCellProps {
    id: User['id'];
}

export const Name: FunctionComponent<NameCellProps> = (
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
