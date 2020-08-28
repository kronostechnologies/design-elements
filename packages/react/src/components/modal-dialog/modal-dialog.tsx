import React, { ReactElement, ReactNode, useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';

const StyledModal = styled(Modal)`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: var(--spacing-4x);
    position: relative;
    width: 500px;
`;

const Header = styled.header`
    margin-bottom: var(--spacing-3x);
`;

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

const CloseIconButton = styled(IconButton)`
    position: absolute;
    right: var(--spacing-1x);
    top: var(--spacing-1x);
`;

const Footer = styled.footer`
    margin-top: var(--spacing-4x);
`;

const ConfirmButton = styled(Button)`
    margin-right: var(--spacing-1x);
`;

const CancelButton = styled(Button)``;

const customStyles = {
    overlay : {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
};

type Role = 'dialog' | 'alertdialog';

interface ModalDialogProps {
    ariaDescribedby?: string;
    children?: ReactNode;
    isOpen: boolean;
    /**
     * Sets modal role tag
     * @default dialog
     */
    role?: Role;
    subtitle?: string;
    title?: string;
    onRequestClose(): void;
}

export function ModalDialog({
    ariaDescribedby,
    children,
    isOpen,
    onRequestClose,
    role = 'dialog',
    subtitle,
    title,
}: ModalDialogProps): ReactElement {
    const modalRef = useRef(null);
    const titleId = uuid();

    function closeModal(): void {
        // @ts-ignore
        modalRef.current?.portal.requestClose();
    }

    return(
        <>
            <StyledModal
                aria={{
                    labelledby: title ? titleId : undefined,
                    describedby: ariaDescribedby,
                    modal: true,
                }}
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ref={modalRef}
                role={role}
                style={customStyles}
                contentLabel={title || undefined}
            >
                <Header>
                    {title && <Title id={titleId} tabIndex={-1}>{title}</Title>}
                    {subtitle && <Subtitle tabIndex={-1}>{subtitle}</Subtitle>}
                    <CloseIconButton label="Close dialog" buttonType="tertiary" iconName="x" onClick={closeModal}/>
                </Header>
                {children}
                <Footer>
                    <ConfirmButton label="Confirm" buttonType="primary"/>
                    <CancelButton label="Cancel" buttonType="tertiary" onClick={closeModal}/>
                </Footer>
            </StyledModal>
        </>
    );
}
