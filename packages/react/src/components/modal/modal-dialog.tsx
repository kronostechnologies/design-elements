import React, { ReactElement } from 'react';
import { AbstractProps, ModalAbstract } from './modal-abstract';

export function ModalDialog({ ...props }: AbstractProps): ReactElement {
    return <ModalAbstract modalType="dialog" {...props}/>;
}
