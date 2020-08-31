import React, { ReactElement } from 'react';
import { ModalAbstract, ModalAbstractProps } from './modal-abstract';

export function ModalAlert({ ...props }: ModalAbstractProps): ReactElement {
    return <ModalAbstract modalType="alert" {...props}/>;
}
