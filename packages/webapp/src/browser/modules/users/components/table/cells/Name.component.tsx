import { Link } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { User, UserMode } from '../../../types';

interface NameCellProps {
    id: User['id'];
    name: User['name'];
}

export const Name: FunctionComponent<NameCellProps> = (
    { id, name },
) => (
    <Link
        href={`/users/${id}/${UserMode.READ}`}
        routerLink={NavLink}
    >
        {name}
    </Link>
);
