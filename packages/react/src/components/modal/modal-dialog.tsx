import { ReactElement, ReactNode, Ref, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons/button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Modal } from './modal';
import { Heading } from '../heading/heading';

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

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
    cancelButton?: { label?: string, onCancel?(): void };
    children?: ReactNode;
    className?: string;
    confirmButton?: { label?: string, onConfirm?(): void };
    footerContent?: ReactElement;
    isOpen: boolean;
    /**
     * Defines if the overlay click should close the modal
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;
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
    className,
    confirmButton,
    footerContent,
    isOpen,
    onRequestClose,
    shouldCloseOnOverlayClick = true,
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
                    {title && (
                        <Heading
                            id={titleId}
                            ref={titleRef}
                            type={isMobile ? 'large' : 'medium'}
                            tag="h2"
                            noMargin
                        >
                            {title}
                        </Heading>
                    )}
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
            className={className}
            modalHeader={getHeader()}
            hasCloseButton
            modalFooter={footerContent || getFooter()}
            role="dialog"
            onAfterOpen={() => titleRef.current?.focus()}
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            appElement={appElement}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            {children}
        </Modal>
    );
}
