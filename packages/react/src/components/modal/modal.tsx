import { useTranslation } from '@design-elements/i18n/i18n';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-height: calc(100vh - var(--spacing-2x));
    max-width: 700px;
    min-width: ${({ breakpoints, isMobile }) => isMobile ? 'initial' : `calc(${breakpoints.mobile}px - var(--spacing-4x))`};
    overflow-y: auto;
    padding: ${getModalPadding};
    position: relative;
    width: ${({ isMobile }) => isMobile ? `calc(100vw - var(--spacing-2x))` : '60vw'};

    /* Firefox overflow-y: scroll problem fix (skipped bottom padding)
    https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */
    &::after {
        content: '';
        display: block;
        padding-bottom: ${getBottomPadding};
    }

    &:focus {
        border-color: ${({ theme }) => theme.tokens['focus-border']};
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
    /** Function that will run after the modal has opened */
    onAfterOpen?(): void;
    /** Function that will run after the modal has closed */
    onAfterClose?(): void;
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
    onAfterOpen,
    onAfterClose,
    onRequestClose,
}: ModalProps): ReactElement {
    const device = useDeviceContext();
    const { t } = useTranslation('modal');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

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
                onAfterOpen={onAfterOpen}
                onAfterClose={onAfterClose}
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
            return 'var(--spacing-6x) var(--spacing-2x) 0';
        } else {
            return 'var(--spacing-3x) var(--spacing-2x) 0';
        }
    } else {
        return 'var(--spacing-4x) var(--spacing-4x) 0';
    }
}

function getBottomPadding({ isMobile, noPadding }: StyledModalProps): string {
    if (noPadding) return '0';
    else if (isMobile) return 'var(--spacing-2x)';
    else return 'var(--spacing-4x)';
}
