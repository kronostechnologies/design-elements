import { Heading } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Form as UserForm } from './components/Form/Form.component';
import { UserView } from './types';

export const UserPage: FunctionComponent = () => {
    const { t } = useTranslation('user');
    const { view, id } = useParams();
    const userMode = view as UserView;
    const titleMap = {
        [UserView.CREATE]: t('createTitle'),
        [UserView.EDIT]: t('editTitle'),
        [UserView.VIEW]: t('title'),
    };
    const title = titleMap[userMode];

    return (
        <>
            <Heading bold noMargin type='xlarge' tag="h1">{title}</Heading>
            <UserForm id={id} />
        </>
    );
};
