import React, { ReactElement } from 'react';
import { ModalAbstract, ModalAbstractProps } from './modal-abstract';

export function ModalDialog({ ...props }: ModalAbstractProps): ReactElement {
    return <ModalAbstract modalType="dialog" {...props}/>;
}
