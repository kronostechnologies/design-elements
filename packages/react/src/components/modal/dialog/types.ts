import { ReactElement } from 'react';
import { IconName } from '../../icon/icon';
import { BaseModalProps } from '../types';

export type DialogType =
    | 'information'
    | 'action'
    | 'alert';

export interface ModalDialogProps extends BaseModalProps {
    title: string;
    titleIcon?: IconName;
    subtitle?: string;

    footerContent?: ReactElement;

    dialogType?: DialogType;
    confirmButton?: { label?: string, onConfirm?(): void };
    cancelButton?: { label?: string, onCancel?(): void };
}
