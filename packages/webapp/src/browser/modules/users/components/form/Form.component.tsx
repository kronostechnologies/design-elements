import { FunctionComponent } from 'react';

interface UserFormProps {
    id?: string;
}

export const Form: FunctionComponent<UserFormProps> = (
    { id },
) => {
    console.log(id);
    return (
        <form />
    );
};
