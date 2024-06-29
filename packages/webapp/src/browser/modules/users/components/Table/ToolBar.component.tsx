import { Button, SearchContextual } from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ActionTypes } from '../../types';
import { useUsersActions } from '../../UsersProvider.component';

const ToolBarContainer = styled.div`
    border-radius: 8px;
    display: flex;
    padding: 8px 8px;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
`;

const StyledSearchBar = styled(SearchContextual)`
    width: 30%;
`;

export const ToolBar: FunctionComponent = () => {
    const { t } = useTranslation('users');
    const dispatch = useUsersActions();
    const [currentValue, setCurrentValue] = useState('');

    const handleSearchChange = (search: string): void => {
        setCurrentValue(search);
        dispatch({
            payload: search,
            type: ActionTypes.SEARCH_USER,
        });
    };

    const handleSearchReset = (): void => {
        setCurrentValue('');
        dispatch({
            payload: '',
            type: ActionTypes.SEARCH_USER,
        });
    };

    const handleCreateUser = useCallback(() => {
        dispatch({
            type: ActionTypes.CREATE_USER,
        });
    }, [dispatch]);

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
