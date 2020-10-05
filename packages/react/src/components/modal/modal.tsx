import React, { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: 8px;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-width: 700px;
    min-width: ${({ breakpoints, isMobile }) => isMobile ? 'initial' : `calc(${breakpoints.mobile}px - var(--spacing-4x))`};
    padding: ${getModalPadding};
    position: relative;
    width: ${({ isMobile }) => isMobile ? `calc(100vw - var(--spacing-4x))` : '60vw'};

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow']}, 0 6px 10px 0 rgba(0, 0, 0, 0.1);
        outline: none;
    }
`;

const Header = styled.header<{ hasContent: boolean }>`
    ${({ hasContent }) => hasContent && 'margin-bottom: var(--spacing-3x);'}
`;

const CloseIconButton = styled(IconButton)<DeviceContextProps>`
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
        zIndex: 10000,
    },
};

interface StyledModalProps extends DeviceContextProps {
    noPadding: boolean;
    hasCloseButton: boolean;
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
    noPadding?: boolean;
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
    onRequestClose(): void;
}

export function Modal({
    appElement,
    ariaDescribedby,
    ariaHideApp = true,
    ariaLabel,
    ariaLabelledBy,
    children,
    noPadding = false,
    hasCloseButton = true,
    isOpen,
    modalFooter,
    modalHeader,
    role = 'dialog',
    shouldCloseOnOverlayClick = true,
    onRequestClose,
}: ModalProps): ReactElement {
    const device = useDeviceContext();
    const { t } = useTranslation('modal');

    if (appElement) {
        ReactModal.setAppElement(appElement);
    }

    function getHeader(): ReactElement | null {
        if (modalHeader) {
            return (
                <Header hasContent={!!modalHeader}>
                    {modalHeader}
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
                noPadding={noPadding}
                hasCloseButton={hasCloseButton}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                role={role}
                style={customStyles}
                contentLabel={ariaLabel}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                {...device}
            >
                {getHeader()}
                {children}
                {modalFooter && <Footer>{modalFooter}</Footer>}
                {hasCloseButton && (
                    <CloseIconButton
                        data-testid="close-button"
                        label={t('closeButtonLabel')}
                        type="button"
                        buttonType="tertiary"
                        iconName="x"
                        onClick={onRequestClose}
                        {...device}
                    />
                )}
            </StyledModal>
        </>
    );
}

function getModalPadding({ noPadding, hasCloseButton, isMobile }: StyledModalProps): string {
    if (noPadding) {
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
