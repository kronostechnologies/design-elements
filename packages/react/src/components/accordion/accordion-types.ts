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
    type?: Type | undefined;
    tag?: Tag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    onToggle?: () => void;
    onKeyDown?: ((event: KeyboardEvent<HTMLButtonElement>) => void) | undefined;
    children: ReactNode;
    buttonRef?: RefObject<HTMLButtonElement> | undefined;
}

export interface AccordionBodyProps {
    expanded?: boolean;
}
