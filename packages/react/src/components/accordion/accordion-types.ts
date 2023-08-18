/* istanbul ignore file */
import { ReactNode, RefObject, KeyboardEvent } from 'react';
import { Type, Tag } from '../heading/heading';

export interface AccordionContainerProps {
    children: ReactNode;
    /** Multipe or single panel open concurrently */
    mode?: 'single' | 'multi';
    /** Define which panel(s) should be open by default */
    defaultExpandedItemIds?: string[];
    /** Defain which accodions should be disabled */
    disabledItemIds?: string[];
}

export interface AccordionProps {
    /** Title Label */
    title: string;
    /** Unique Id on each accordion per group */
    id: string;
    /** This is relate to styling */
    type?: Type;
    /** Choose the right tag for page outline */
    tag?: Tag;
    /** Property is used without value */
    noMargin?: boolean;
    isExpanded?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
    onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    buttonRef?: RefObject<HTMLButtonElement>;
}
