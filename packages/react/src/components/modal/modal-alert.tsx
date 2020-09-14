import React, { ReactElement } from 'react';
import { AbstractProps, ModalAbstract } from './modal-abstract';

export function ModalAlert({ ...props }: AbstractProps): ReactElement {
    return <ModalAbstract modalType="alert" {...props}/>;
}
