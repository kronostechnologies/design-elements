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
    title: string;
    id?: string;
    type?: Type;
    tag?: Tag;
    expanded?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    buttonRef?: RefObject<HTMLButtonElement>;
}

export interface AccordionBodyProps {
    expanded?: boolean;
}
