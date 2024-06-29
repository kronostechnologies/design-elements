import { IconButton, ModalDialog, useModal, useToast } from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ActionTypes, TableDataType } from '../../types';
import { useUsersActions, useUsersContext } from '../../UsersProvider.component';

const ActionCellContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export interface ActionCellsProps {
    id: TableDataType['id'];
}

export const ActionsCell: FunctionComponent<ActionCellsProps> = (
    { id },
) => {
    const { t } = useTranslation('users');
    const { users } = useUsersContext();
    const user = users.find((u) => u.id === id);
    const dispatch = useUsersActions();
    const { openModal, closeModal, isModalOpen } = useModal();
    const { showToast } = useToast();

    const removeUserConfirm = useCallback(() => {
        dispatch({
            payload: id,
            type: ActionTypes.DELETE_USER,
        });
        closeModal();
        showToast('success', t('deleteUserSuccess', { user: user?.name }));
    }, [closeModal, dispatch, id, showToast, t, user?.name]);

    const removeUser = useCallback(() => {
        openModal();
    }, [openModal]);

    const editUser = useCallback(() => {
        console.log('Edit user...');
    }, []);

    return (
        <ActionCellContainer>
            <IconButton
                buttonType="tertiary"
                iconName="edit"
                onClick={() => editUser()}
            />
            <IconButton
                buttonType="tertiary"
                iconName="trash"
                onClick={() => removeUser()}
            />
            <ModalDialog
                title={t('deleteUser', { user: user?.name })}
                appElement="#root"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                confirmButton={{
                    label: t('delete'),
                    onConfirm: removeUserConfirm,

                }}
                cancelButton={{
                    label: t('cancel'),
                }}
                dialogType='alert'
            >
                <span id="modal-description">{t('deleteUserMessage')}</span>
            </ModalDialog>
        </ActionCellContainer>
    );
};
