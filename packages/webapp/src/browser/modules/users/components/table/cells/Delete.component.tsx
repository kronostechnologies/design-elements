import { IconButton, ModalDialog, Tooltip, useModal, useToast } from '@equisoft/design-elements-react';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserContext, useUsersActions } from '../../../state';
import { User, UsersAction } from '../../../types';

export interface DeleteCellProps {
    id: User['id'];
}

export const Delete: FunctionComponent<DeleteCellProps> = (
    { id },
) => {
    const { t } = useTranslation('users');
    const user = useUserContext(id);
    const dispatch = useUsersActions();
    const { openModal, closeModal, isModalOpen } = useModal();
    const { showToast } = useToast();

    const onDeleteUserConfirm = useCallback(() => {
        dispatch({
            type: UsersAction.DELETE,
            id,
        });
        closeModal();
        showToast('success', t('deleteUserSuccess', { user: user?.name }));
    }, [closeModal, dispatch, id, showToast, t, user?.name]);

    const deleteUser = useCallback(() => {
        openModal();
    }, [openModal]);

    return (
        <>
            <Tooltip label={t('deleteUser', { user: user?.name })}>
                <IconButton
                    buttonType="tertiary"
                    iconName="trash"
                    aria-label={t('deleteUser', { user: user?.name })}
                    onClick={() => deleteUser()}
                />
            </Tooltip>
            <ModalDialog
                title={t('deleteUser', { user: `${user?.name}` })}
                appElement="#root"
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                confirmButton={{
                    label: t('delete'),
                    onConfirm: onDeleteUserConfirm,

                }}
                cancelButton={{
                    label: t('cancel'),
                }}
                dialogType='alert'
            >
                <span id="modal-description">{t('deleteUserMessage')}</span>
            </ModalDialog>
        </>
    );
};
