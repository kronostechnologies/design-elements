import { ReactNode, RefObject, KeyboardEvent } from 'react';
import { Type, Tag } from '../heading/heading';

export interface AccordionProps {
    /** Unique id per accordion */
    id: string;
    children: ReactNode;
    /** Multipe or single panel open concurrently */
    mode?: 'single' | 'multi';
}

export interface AccordionItemProps {
    /** Title Label */
    title: string;
    /** Unique Id on each accordion per group */
    id?: string;
    /** This is relate to styling */
    type?: Type;
    /** Choose the right tag for page outline */
    tag?: Tag;
    isExpanded?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    buttonRef?: RefObject<HTMLButtonElement>;
}
