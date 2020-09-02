import { Button } from '@design-elements/components/buttons/button';
import React, { ReactElement, ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Modal } from './modal';

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: var(--font-normal);
    height: 32px;
    line-height: 24px;
    margin-bottom: var(--spacing-2x);
    margin-top: 0;
`;

const Subtitle = styled.h3`
    font-size: 1rem;
    font-weight: var(--font-normal);
    height: 24px;
    line-height: 22px;
    margin: 0;
`;

const ConfirmButton = styled(Button)`
    margin-right: var(--spacing-1x);
`;

const CancelButton = styled(Button)``;

export interface ModalAbstractProps {
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true. */
    ariaHideApp?: boolean;
    /** Is set to title value if title is set */
    ariaLabel?: string;
    children?: ReactNode;
    isOpen: boolean;
    subtitle?: string;
    title?: string;
    onConfirm?(): void;
    onRequestClose(): void;
}

interface Props extends ModalAbstractProps {
    modalType: 'dialog' | 'alert';
}

export function ModalAbstract({
    ariaLabel,
    children,
    modalType,
    onConfirm,
    subtitle,
    title,
    ...props
}: Props): ReactElement {
    const { t } = useTranslation('modal-abstract');
    const modalRef = useRef(null);
    const titleId = uuid();
    const isDialog = modalType === 'dialog';

    function closeModal(): void {
        // @ts-ignore
        modalRef.current?.portal.requestClose();
    }

    function getHeader(): ReactElement | undefined {
        if (title || subtitle) {
            return (
                <>
                    {title && <Title id={titleId} tabIndex={-1}>{title}</Title>}
                    {subtitle && <Subtitle tabIndex={-1}>{subtitle}</Subtitle>}
                </>
            );
        } else return undefined;
    }

    function getFooter(): ReactElement {
        return (
            <>
                <ConfirmButton
                    data-testid="confirm-button"
                    label={t('confirmButtonLabel')}
                    buttonType="primary"
                    onClick={onConfirm}
                />
                <CancelButton label={t('cancelButtonLabel')} buttonType="tertiary" onClick={closeModal}/>
            </>
        );
    }

    return (
        <Modal
            ariaLabel={ariaLabel || title}
            ariaLabelledBy={title ? titleId : undefined}
            modalHeader={getHeader()}
            hasCloseButton={isDialog ? true : false}
            modalFooter={getFooter()}
            ref={modalRef}
            role={isDialog ? 'dialog' : 'alertdialog'}
            {...props}
        >
            {children}
        </Modal>
    );
}
