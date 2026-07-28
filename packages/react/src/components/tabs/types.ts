import type { KeyboardEvent, ReactNode } from 'react';
import type { IconName } from '../icon';

export type TabSize = 'medium' | 'small';

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
