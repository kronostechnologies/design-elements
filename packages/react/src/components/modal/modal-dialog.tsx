import { Fragment, ReactElement, ReactNode, Ref, useMemo, useRef, VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { v4 as uuid } from '../../utils/uuid';
import { Button } from '../buttons/button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Heading } from '../heading/heading';
import { Icon, IconName } from '../icon/icon';
import { Modal } from './modal';

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

export type DialogType =
    | 'information'
    | 'action'
    | 'alert';

const ModalRoles: Record<DialogType, string> = {
    information: 'dialog',
    action: 'dialog',
    alert: 'alertdialog',
};

const StyledModal = styled(Modal)<{ $hasTitleIcon: boolean }>`
    ${({ $hasTitleIcon }) => $hasTitleIcon && css`
        padding-left: var(--spacing-4x);
    `}
`;

const Subtitle = styled.h3<MobileDeviceContextProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1.125 : 1)}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => (isMobile ? 1.75 : 1.375)}rem;
    margin: var(--spacing-3x) 0 0;
`;

const ButtonContainer = styled.div<MobileDeviceContextProps & { $hasTitleIcon: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'unset')};
    justify-content: end;

    ${({ isMobile, $hasTitleIcon }) => (isMobile && $hasTitleIcon) && css`
        margin-left: calc(var(--spacing-4x) * -1);
    `}
`;

const ConfirmButton = styled(Button)<MobileDeviceContextProps>`
    margin-left: ${({ isMobile }) => (isMobile ? 0 : 'var(--spacing-1x)')};
    margin-top: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 0)};
`;

const CancelButton = styled(Button)``;

const HeadingWrapper = styled.div`
    position: relative;
`;

const TitleIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

const StyledHeadingWrapperComponent = styled(HeadingWrapper)`
    align-items: center;
    display: flex;
    margin-left: calc(-1 * var(--spacing-4x));
`;

export interface ModalDialogProps {
    /** Takes a query selector targeting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    cancelButton?: { label?: string, onCancel?(): void };
    children?: ReactNode;
    className?: string;
    confirmButton?: { label?: string, onConfirm?(): void };
    footerContent?: ReactElement;
    hasCloseButton?: boolean;
    isOpen: boolean;
    parentSelector?: () => HTMLElement;
    /**
     * Defines if the overlay click should close the modal
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;
    subtitle?: string;
    title: string;
    titleIcon?: IconName;
    dialogType?: DialogType;

    onRequestClose(): void;
}

export const ModalDialog: VoidFunctionComponent<ModalDialogProps> = ({
    appElement,
    ariaDescribedby,
    ariaHideApp,
    dialogType = 'action',
    cancelButton,
    children,
    className,
    confirmButton,
    footerContent,
    hasCloseButton,
    isOpen,
    parentSelector,
    shouldCloseOnOverlayClick = true,
    subtitle,
    title,
    titleIcon,
    onRequestClose,
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('modal-dialog');
    const titleId = useMemo(uuid, []);
    const titleRef: Ref<HTMLHeadingElement> = useRef(null);
    const titleIconName = dialogType === 'alert' ? 'alertFilled' : titleIcon;
    const hasTitleIcon = !!titleIconName;

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
        const HeadingWrapperComponent = hasTitleIcon ? StyledHeadingWrapperComponent : Fragment;

        return (
            <>
                <HeadingWrapperComponent>
                    {titleIconName && (
                        <TitleIcon name={titleIconName} size="24" data-testid="title-icon" />
                    )}
                    <Heading
                        id={titleId}
                        ref={titleRef}
                        type="medium"
                        tag="h2"
                        noMargin
                    >
                        {title}
                    </Heading>
                </HeadingWrapperComponent>
                {subtitle && (
                    <Subtitle isMobile={isMobile}>{subtitle}</Subtitle>
                )}
            </>
        );
    }

    function getFooter(): ReactElement {
        const confirmButtonType = dialogType === 'alert' ? 'destructive' : 'primary';

        return (
            <ButtonContainer isMobile={isMobile} $hasTitleIcon={hasTitleIcon}>
                {dialogType !== 'information' && (
                    <CancelButton
                        data-testid="cancel-button"
                        label={cancelButton?.label || t('cancelButtonLabel')}
                        buttonType="tertiary"
                        onClick={handleCancel}
                    />
                )}
                <ConfirmButton
                    data-testid="confirm-button"
                    label={confirmButton?.label || t('confirmButtonLabel')}
                    buttonType={confirmButtonType}
                    onClick={handleConfirm}
                    isMobile={isMobile}
                />
            </ButtonContainer>
        );
    }

    return (
        <StyledModal
            ariaDescribedby={ariaDescribedby}
            ariaHideApp={ariaHideApp}
            ariaLabelledBy={titleId}
            className={className}
            modalHeader={getHeader()}
            hasCloseButton={hasCloseButton}
            modalFooter={footerContent || getFooter()}
            parentSelector={parentSelector}
            role={ModalRoles[dialogType]}
            onAfterOpen={() => titleRef.current?.focus()}
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            appElement={appElement}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            $hasTitleIcon={hasTitleIcon}
        >
            {children}
        </StyledModal>
    );
};
