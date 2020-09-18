import React, { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { Button } from '../buttons/button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Modal } from './modal';

const Title = styled.h2<IsMobile>`
    font-size: ${({ isMobile }) => isMobile ? 1.5 : 1.25}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => isMobile ? 36 : 32}px;
    margin: 0;
`;

const Subtitle = styled.h3<{ hasTitle: boolean, isMobile: boolean }>`
    font-size: ${({ isMobile }) => isMobile ? 1.125 : 1}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => isMobile ? 28 : 22}px;
    margin: 0;
    margin-top: ${({ hasTitle }) => hasTitle ? 'var(--spacing-3x)' : 0};
`;

const ButtonContainer = styled.div<IsMobile>`
    display: flex;
    flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'unset'};
`;

const ConfirmButton = styled(Button)<IsMobile>`
    margin-bottom: ${({ isMobile }) => isMobile ? 'var(--spacing-half)' : 0};
    margin-right: ${({ isMobile }) => isMobile ? 0 : 'var(--spacing-1x)'};
`;

const CancelButton = styled(Button)``;

interface IsMobile {
    isMobile: boolean;
}

export interface AbstractProps {
    /** Takes a query selector targeting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    /** Is set to title value if title is set */
    ariaLabel?: string;
    children?: ReactNode;
    isOpen: boolean;
    subtitle?: string;
    title?: string;
    onCancel?(): void;
    onClose?(): void;
    onConfirm?(): void;
    onRequestClose(): void;
}

export interface ModalAbstractProps extends AbstractProps {
    modalType: 'dialog' | 'alert';
}

export function ModalAbstract({
    ariaLabel,
    children,
    modalType,
    onCancel,
    onConfirm,
    onRequestClose,
    subtitle,
    title,
    ...props
}: ModalAbstractProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('modal-abstract');
    const titleId = uuid();
    const isDialog = modalType === 'dialog';

    function handleCancel(): void {
        if (onCancel) {
            onCancel();
        } else {
            onRequestClose();
        }
    }

    function getHeader(): ReactElement | undefined {
        if (title || subtitle) {
            return (
                <>
                    {title && <Title isMobile={isMobile} id={titleId} tabIndex={-1}>{title}</Title>}
                    {subtitle && (
                        <Subtitle hasTitle={title !== undefined} isMobile={isMobile} tabIndex={-1}>{subtitle}</Subtitle>
                    )}
                </>
            );
        } else return undefined;
    }

    function getFooter(): ReactElement {
        return (
            <ButtonContainer isMobile={isMobile}>
                <ConfirmButton
                    data-testid="confirm-button"
                    isMobile={isMobile}
                    label={t('confirmButtonLabel')}
                    buttonType="primary"
                    onClick={onConfirm}
                />
                <CancelButton
                    data-testid="cancel-button"
                    label={t('cancelButtonLabel')}
                    buttonType="tertiary"
                    onClick={handleCancel}
                />
            </ButtonContainer>
        );
    }

    return (
        <Modal
            ariaLabel={ariaLabel || title}
            ariaLabelledBy={title ? titleId : undefined}
            modalHeader={getHeader()}
            hasCloseButton={isDialog}
            modalFooter={getFooter()}
            role={isDialog ? 'dialog' : 'alertdialog'}
            shouldCloseOnOverlayClick={isDialog}
            onRequestClose={onRequestClose}
            {...props}
        >
            {children}
        </Modal>
    );
}
