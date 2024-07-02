import { Button, SearchContextual } from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ActionType, UserView } from '../../types';
import { useUsersActions } from '../../UsersProvider.component';

const ToolBarContainer = styled.div`
    align-items: center;
    align-self: stretch;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 8px 8px;
`;

const StyledSearchBar = styled(SearchContextual)`
    width: 30%;
`;

export const ToolBar: FunctionComponent = () => {
    const { t } = useTranslation('users');
    const dispatch = useUsersActions();
    const navigate = useNavigate();
    const [currentValue, setCurrentValue] = useState('');

    const handleSearchChange = (search: string): void => {
        setCurrentValue(search);
        dispatch({
            payload: search,
            type: ActionType.SEARCH_USER,
        });
    };

    const handleSearchReset = (): void => {
        setCurrentValue('');
        dispatch({
            payload: '',
            type: ActionType.SEARCH_USER,
        });
    };

    const handleCreateUser = useCallback(() => {
        navigate(`/user/${UserView.CREATE}`);
    }, [navigate]);

    return (
        <ToolBarContainer>
            <StyledSearchBar
                placeholder={t('search')}
                onChange={handleSearchChange}
                onReset={handleSearchReset}
                value={currentValue}
            />
            <Button
                leftIconName="plusSign"
                label={t('create')}
                buttonType="secondary"
                onClick={handleCreateUser}
            />
        </ToolBarContainer>
    );
};
