import React, { ReactElement, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { Button } from '../buttons/button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Modal } from './modal';

const Title = styled.h2<DeviceContextProps>`
    font-size: ${({ isMobile }) => isMobile ? 1.5 : 1.25}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => isMobile ? 36 : 32}px;
    margin: 0;
`;

const Subtitle = styled.h3<{ hasTitle: boolean } & DeviceContextProps>`
    font-size: ${({ isMobile }) => isMobile ? 1.125 : 1}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => isMobile ? 28 : 22}px;
    margin: 0;
    margin-top: ${({ hasTitle }) => hasTitle ? 'var(--spacing-3x)' : 0};
`;

const ButtonContainer = styled.div<DeviceContextProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'unset'};
`;

const ConfirmButton = styled(Button)<DeviceContextProps>`
    margin-bottom: ${({ isMobile }) => isMobile ? 'var(--spacing-half)' : 0};
    margin-right: ${({ isMobile }) => isMobile ? 0 : 'var(--spacing-1x)'};
`;

const CancelButton = styled(Button)``;

export interface ModalDialogProps {
    /** Takes a query selector targeting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    /** Is set to title value if title is set */
    ariaLabel?: string;
    confirmButton?: { label?: string, onConfirm?(): void };
    cancelButton?: { label?: string, onCancel?(): void };
    children?: ReactNode;
    isOpen: boolean;
    subtitle?: string;
    title?: string;
    onRequestClose(): void;
}

export function ModalDialog({
    ariaLabel,
    children,
    confirmButton,
    cancelButton,
    onRequestClose,
    subtitle,
    title,
    ...props
}: ModalDialogProps): ReactElement {
    const deviceContext = useDeviceContext();
    const { t } = useTranslation('modal-dialog');
    const titleId = useMemo(uuid, []);

    function handleConfirm(): void {
        confirmButton?.onConfirm?.();
    }

    function handleCancel(): void {
        if (cancelButton?.onCancel) {
            cancelButton.onCancel();
        } else {
            onRequestClose();
        }
    }

    function getHeader(): ReactElement | undefined {
        if (title || subtitle) {
            return (
                <>
                    {title && <Title id={titleId} tabIndex={-1} {...deviceContext}>{title}</Title>}
                    {subtitle && (
                        <Subtitle hasTitle={title !== undefined} tabIndex={-1} {...deviceContext}>{subtitle}</Subtitle>
                    )}
                </>
            );
        } else return undefined;
    }

    function getFooter(): ReactElement {
        return (
            <ButtonContainer {...deviceContext}>
                <ConfirmButton
                    data-testid="confirm-button"
                    label={confirmButton?.label || t('confirmButtonLabel')}
                    buttonType="primary"
                    onClick={handleConfirm}
                    {...deviceContext}
                />
                <CancelButton
                    data-testid="cancel-button"
                    label={cancelButton?.label || t('cancelButtonLabel')}
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
            hasCloseButton
            modalFooter={getFooter()}
            role="dialog"
            onRequestClose={onRequestClose}
            {...props}
        >
            {children}
        </Modal>
    );
}
