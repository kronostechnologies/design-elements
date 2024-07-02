import { IconButton, ModalDialog, useModal, useToast } from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ActionType, TableDataType, UserView } from '../../types';
import { useUserContext, useUsersActions } from '../../UsersProvider.component';

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
    const user = useUserContext(id);
    const navigate = useNavigate();
    const dispatch = useUsersActions();
    const { openModal, closeModal, isModalOpen } = useModal();
    const { showToast } = useToast();

    const removeUserConfirm = useCallback(() => {
        dispatch({
            payload: id,
            type: ActionType.DELETE_USER,
        });
        closeModal();
        showToast('success', t('deleteUserSuccess', { user: user?.name }));
    }, [closeModal, dispatch, id, showToast, t, user?.name]);

    const removeUser = useCallback(() => {
        openModal();
    }, [openModal]);

    const editUser = useCallback(() => {
        navigate(`/user/${UserView.EDIT}/${id}`);
    }, [id, navigate]);

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
