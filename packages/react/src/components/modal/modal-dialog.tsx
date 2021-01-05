import { useTranslation } from '@design-elements/i18n/i18n';
import { v4 as uuid } from '@design-elements/utils/uuid';
import React, { ReactElement, ReactNode, Ref, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Button } from '../buttons/button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Modal } from './modal';

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

const Title = styled.h2<MobileDeviceContextProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1.5 : 1.25)}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => (isMobile ? 2.25 : 2)}rem;
    margin: 0;

    :focus {
        outline: none;
    }
`;

const Subtitle = styled.h3<{ hasTitle: boolean } & MobileDeviceContextProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1.125 : 1)}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => (isMobile ? 1.75 : 1.375)}rem;
    margin: 0;
    margin-top: ${({ hasTitle }) => (hasTitle ? 'var(--spacing-3x)' : 0)};
`;

const ButtonContainer = styled.div<MobileDeviceContextProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'unset')};
`;

const ConfirmButton = styled(Button)<MobileDeviceContextProps>`
    margin-bottom: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 0)};
    margin-right: ${({ isMobile }) => (isMobile ? 0 : 'var(--spacing-1x)')};
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
    appElement,
    ariaDescribedby,
    ariaHideApp,
    ariaLabel,
    cancelButton,
    children,
    confirmButton,
    isOpen,
    onRequestClose,
    subtitle,
    title,
}: ModalDialogProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('modal-dialog');
    const titleId = useMemo(uuid, []);
    const titleRef: Ref<HTMLHeadingElement> = useRef(null);

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
                    {title && <Title id={titleId} ref={titleRef} tabIndex={-1} isMobile={isMobile}>{title}</Title>}
                    {subtitle && (
                        <Subtitle hasTitle={title !== undefined} isMobile={isMobile}>{subtitle}</Subtitle>
                    )}
                </>
            );
        }
        return undefined;
    }

    function getFooter(): ReactElement {
        return (
            <ButtonContainer isMobile={isMobile}>
                <ConfirmButton
                    data-testid="confirm-button"
                    label={confirmButton?.label || t('confirmButtonLabel')}
                    buttonType="primary"
                    onClick={handleConfirm}
                    isMobile={isMobile}
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
            ariaDescribedby={ariaDescribedby}
            ariaHideApp={ariaHideApp}
            ariaLabel={title ? undefined : ariaLabel}
            ariaLabelledBy={title ? titleId : undefined}
            modalHeader={getHeader()}
            hasCloseButton
            modalFooter={getFooter()}
            role="dialog"
            onAfterOpen={() => titleRef.current?.focus()}
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            appElement={appElement}
        >
            {children}
        </Modal>
    );
}
