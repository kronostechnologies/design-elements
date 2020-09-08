import React, { forwardRef, ReactElement, ReactNode, Ref, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';

const StyledModal = styled(ReactModal)`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: var(--spacing-4x);
    position: relative;
    width: 500px;
`;

const Header = styled.header<{ hasContent: boolean }>`
    ${({ hasContent }) => hasContent && 'margin-bottom: var(--spacing-3x);'}
`;

const CloseIconButton = styled(IconButton)`
    position: absolute;
    right: var(--spacing-1x);
    top: var(--spacing-1x);
`;

const Footer = styled.footer`
    margin-top: var(--spacing-4x);
`;

const customStyles = {
    overlay : {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
};

type Role = 'dialog' | 'alertdialog';

interface ModalProps {
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true. */
    ariaHideApp?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    children?: ReactNode;
    /**
     * Adds "x" iconButton to close modal
     * @default true
     */
    hasCloseButton?: boolean;
    isOpen: boolean;
    modalFooter?: ReactNode;
    modalHeader?: ReactNode;
    /**
     * Sets modal role tag
     * @default dialog
     */
    role?: Role;
    onRequestClose(): void;
}

export const Modal = forwardRef(({
    appElement,
    ariaDescribedby,
    ariaHideApp = true,
    ariaLabel,
    ariaLabelledBy,
    children,
    hasCloseButton = true,
    isOpen,
    modalFooter,
    modalHeader,
    role = 'dialog',
    onRequestClose,
}: ModalProps, ref: Ref<ReactModal | null>): ReactElement => {
    const { t } = useTranslation('modal');
    const modalRef = useRef(null);
    appElement && ReactModal.setAppElement(appElement);
    useImperativeHandle(ref, () => modalRef.current, [modalRef]);

    function closeModal(): void {
        // @ts-ignore
        modalRef.current?.portal.requestClose();
    }

    function getHeader(): ReactElement {
        return (modalHeader || hasCloseButton) && (
            <Header hasContent={modalHeader !== undefined}>
                {modalHeader}
                {hasCloseButton && (
                    <CloseIconButton
                        data-testid="close-button"
                        label={t('closeButtonLabel')}
                        type="button"
                        buttonType="tertiary"
                        iconName="x"
                        onClick={closeModal}
                    />
                )}
            </Header>
        );
    }

    return(
        <>
            <StyledModal
                aria={{
                    describedby: ariaDescribedby,
                    labelledby: ariaLabelledBy,
                    modal: true,
                }}
                ariaHideApp={ariaHideApp}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ref={modalRef}
                role={role}
                style={customStyles}
                contentLabel={ariaLabel}
            >
                {getHeader()}
                {children}
                {modalFooter && <Footer>{modalFooter}</Footer>}
            </StyledModal>
        </>
    );
});
