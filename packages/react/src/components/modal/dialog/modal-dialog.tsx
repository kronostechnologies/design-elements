import { Fragment, ReactElement, Ref, useMemo, useRef, VoidFunctionComponent } from 'react';
import { useTranslation } from '../../../i18n/use-translation';
import { v4 as uuid } from '../../../utils/uuid';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { Heading } from '../../heading/heading';
import { Modal } from '../modal';
import {
    ButtonContainer,
    CancelButton,
    ConfirmButton,
    StyledHeadingWrapperComponent,
    Subtitle,
    TitleIcon,
} from './styled';
import { DialogType, ModalDialogProps } from './types';

const ModalRoles: Record<DialogType, string> = {
    information: 'dialog',
    action: 'dialog',
    alert: 'alertdialog',
};

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
    width,
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
    const titleIconName = dialogType === 'alert' ? 'alertOctagon' : titleIcon;
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
            <HeadingWrapperComponent>
                {titleIconName && (
                    <TitleIcon
                        $dialogType={dialogType}
                        name={titleIconName}
                        size="24"
                        data-testid="title-icon"
                        aria-hidden="true"
                    />
                )}
                <Heading
                    id={titleId}
                    ref={titleRef}
                    type="medium"
                    tag="h2"
                    noMargin
                    bold
                >
                    {title}
                </Heading>
            </HeadingWrapperComponent>
        );
    }

    function getFooter(): ReactElement {
        const confirmButtonType = dialogType === 'alert' ? 'destructive-primary' : 'primary';

        return (
            <ButtonContainer isMobile={isMobile}>
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
                />
            </ButtonContainer>
        );
    }

    return (
        <Modal
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
            width={width}
        >
            {subtitle && (
                <Subtitle
                    tag="h3"
                    type="small"
                    noMargin
                    bold
                >
                    {subtitle}
                </Subtitle>
            )}
            {children}
        </Modal>
    );
};
