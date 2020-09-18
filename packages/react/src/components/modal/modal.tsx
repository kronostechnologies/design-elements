import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: 8px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: ${getModalPadding};
    position: relative;
    width: ${({ isMobile }) => isMobile ? 344 : 500}px;
`;

const Header = styled.header<{ hasContent: boolean }>`
    ${({ hasContent }) => hasContent && 'margin-bottom: var(--spacing-3x);'}
`;

const CloseIconButton = styled(IconButton)<{ isMobile: boolean }>`
    position: absolute;
    right: ${({ isMobile }) => isMobile ? 'var(--spacing-half)' : 'var(--spacing-1x)'};
    top: ${({ isMobile }) => isMobile ? 'var(--spacing-half)' : 'var(--spacing-1x)'};
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

interface StyledModalProps {
    disablePadding: boolean;
    hasCloseButton: boolean;
    isMobile: boolean;
}

export interface ModalProps {
    /** Takes a query selector targetting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    children?: ReactNode;
    /**
     * Removes padding to give you a blank modal to work with.
     * @default false
     */
    disablePadding?: boolean;
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
    role?: string;
    /**
     * Defines if the overlay click should close the modal
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;
    onClose?(): void;
    onRequestClose(): void;
}

export function Modal({
    appElement,
    ariaDescribedby,
    ariaHideApp = true,
    ariaLabel,
    ariaLabelledBy,
    children,
    disablePadding = false,
    hasCloseButton = true,
    isOpen,
    modalFooter,
    modalHeader,
    role = 'dialog',
    shouldCloseOnOverlayClick = true,
    onClose,
    onRequestClose,
}: ModalProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('modal');
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        if (didMount && (onClose && !isOpen)) {
            onClose();
        } else {
            setDidMount(true);
        }
    }, [isOpen]);

    if (appElement) {
        ReactModal.setAppElement(appElement);
    }

    function getHeader(): ReactElement | null {
        if (modalHeader || hasCloseButton) {
            return (
                <Header hasContent={modalHeader !== undefined}>
                    {modalHeader}
                    {hasCloseButton && (
                        <CloseIconButton
                            data-testid="close-button"
                            isMobile={isMobile}
                            label={t('closeButtonLabel')}
                            type="button"
                            buttonType="tertiary"
                            iconName="x"
                            onClick={onRequestClose}
                        />
                    )}
                </Header>
            );
        } else return null;
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
                disablePadding={disablePadding}
                hasCloseButton={hasCloseButton}
                isMobile={isMobile}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                role={role}
                style={customStyles}
                contentLabel={ariaLabel}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            >
                {getHeader()}
                {children}
                {modalFooter && <Footer>{modalFooter}</Footer>}
            </StyledModal>
        </>
    );
}

function getModalPadding({ disablePadding, hasCloseButton, isMobile }: StyledModalProps): string {
    if (disablePadding) {
        return '0';
    } else if (isMobile) {
        if (hasCloseButton) {
            return 'var(--spacing-6x) var(--spacing-2x) var(--spacing-2x)';
        } else {
            return 'var(--spacing-3x) var(--spacing-2x) var(--spacing-2x)';
        }
    } else {
        return 'var(--spacing-4x)';
    }
}
