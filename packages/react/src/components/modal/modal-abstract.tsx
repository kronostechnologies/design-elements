import React, { ReactElement, ReactNode, useRef } from 'react';
import uuid from 'uuid/v4';
import { Modal } from './modal';
import { getFooter, getHeader } from './utils';

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
    onRequestClose(): void;
}

interface Props extends ModalAbstractProps {
    modalType: 'dialog' | 'alert';
}

export function ModalAbstract({ ariaLabel, children, modalType, subtitle, title, ...props }: Props): ReactElement {
    const modalRef = useRef(null);
    const titleId = uuid();
    const isDialog = modalType === 'dialog';

    function closeModal(): void {
        // @ts-ignore
        modalRef.current?.portal.requestClose();
    }

    return (
        <Modal
            ariaLabel={ariaLabel || title}
            ariaLabelledBy={title ? titleId : undefined}
            modalHeader={getHeader({ titleId, title, subtitle })}
            hasCloseButton={isDialog ? true : false}
            modalFooter={getFooter({ closeModal })}
            ref={modalRef}
            role={isDialog ? 'dialog' : 'alertdialog'}
            {...props}
        >
            {children}
        </Modal>
    );
}
