import { FunctionComponent } from 'react';

interface UserFormProps {
    id?: string;
}

export const Form: FunctionComponent<UserFormProps> = (
    { id },
) => {
    // eslint-disable-next-line no-console
    console.log(id);
    return (
        <form />
    );
};
