import { type FC, Fragment, ReactElement, Ref, useRef } from 'react';
import { useId } from '../../../hooks/use-id';
import { useTranslation } from '../../../i18n/use-translation';
import { Button } from '../../buttons';
import { useDeviceContext } from '../../device-context-provider';
import { Heading } from '../../heading';
import { type IconName } from '../../icon';
import { Modal } from '../modal';
import type { BaseModalProps } from '../types';
import { ButtonContainer, StyledHeadingWrapperComponent, TitleIcon } from './styled';

export type DialogType =
    | 'information'
    | 'action'
    | 'alert';

const modalRoles: Record<DialogType, string> = {
    information: 'dialog',
    action: 'dialog',
    alert: 'alertdialog',
};

export interface ModalDialogProps extends BaseModalProps {
    title: string;
    titleIcon?: IconName;
    subtitle?: string;
    footerContent?: ReactElement;
    dialogType?: DialogType;
    confirmButton?: { label?: string, onConfirm?(): void };
    cancelButton?: { label?: string, onCancel?(): void };
}

export const ModalDialog: FC<ModalDialogProps> = ({
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
    const titleId = useId();
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
                    <Button
                        data-testid="cancel-button"
                        label={cancelButton?.label || t('cancelButtonLabel')}
                        buttonType="tertiary"
                        onClick={handleCancel}
                    />
                )}
                <Button
                    data-testid="confirm-button"
                    label={confirmButton?.label || t('confirmButtonLabel')}
                    buttonType={confirmButtonType}
                    onClick={handleConfirm}
                />
            </ButtonContainer>
        );
    }

    function getSubtitle(): ReactElement | null {
        return subtitle ? (
            <Heading
                tag="h3"
                type="small"
                noMargin
                bold
            >
                {subtitle}
            </Heading>
        ) : null;
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
            role={modalRoles[dialogType]}
            onAfterOpen={() => titleRef.current?.focus()}
            onRequestClose={onRequestClose}
            isOpen={isOpen}
            appElement={appElement}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            width={width}
        >
            {getSubtitle()}
            {children}
        </Modal>
    );
};
