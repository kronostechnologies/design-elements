import { ReactNode, KeyboardEvent } from 'react';
import { IconName } from '../icon/icon';

export type TabSize = 'default' | 'small';

export interface Tab {
    id: string;
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    panelContent: ReactNode;
    onBeforeUnload?(): Promise<boolean>;
}

export interface TabButtonProps {
    size: TabSize;
    id: string;
    panelId: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    isSelected: boolean;
    onClick(): void;
    onRemove?(): void;
    onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void;
    children: ReactNode;
}

export interface TabPanelProps {
    buttonId: string,
    children: ReactNode;
    hidden: boolean,
    id: string,
    size?: TabSize;
}
