import { Heading } from '@equisoft/design-elements-react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Form as UserForm } from './components/form/Form.component';
import { UserMode } from './types';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledWarning = styled.span`
    color: ${({ theme }) => theme.alias['color-content']};
    display: flex;
    flex-direction: row;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    gap: 4px;
    letter-spacing: 0.2px;
    line-height: 20px;
`;

const StyledAsterisk = styled.span`
    color: ${({ theme }) => theme.alias['color-feedback-border-alert']};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0.2px;
    line-height: 20px;
`;

export const UserPage: FunctionComponent = () => {
    const { t } = useTranslation('user');
    const { mode, id } = useParams();
    const userMode = mode as UserMode || UserMode.CREATE;
    const titleMap = {
        [UserMode.CREATE]: t('createTitle'),
        [UserMode.EDIT]: t('editTitle'),
        [UserMode.READ]: t('readTitle'),
    };
    const title = titleMap[userMode];

    return (
        <PageWrapper>
            <Heading bold noMargin type='xlarge' tag="h1">{title}</Heading>
            <StyledWarning>
                {t('requiredFields')}
                <StyledAsterisk>*</StyledAsterisk>
            </StyledWarning>
            <UserForm id={id} />
        </PageWrapper>
    );
};
