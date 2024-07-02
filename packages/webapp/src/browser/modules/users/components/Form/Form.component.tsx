import { Card } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useUserContext } from '../../UsersProvider.component';

interface UserFormProps {
    id?: string;
}

export const Form: FunctionComponent<UserFormProps> = (
    { id },
) => {
    const user = useUserContext(id);
    return (
        <Card>
            <div>{user?.name}</div>
            <div>{user?.email}</div>
            <div>{user?.phone}</div>
            <div>{user?.gender}</div>
            <div>{user?.salutation}</div>
            <div>{user?.birthDate}</div>
            <div>{user?.favoriteColor}</div>
        </Card>
    );
};
