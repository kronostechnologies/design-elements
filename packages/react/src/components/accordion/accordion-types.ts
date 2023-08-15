/* istanbul ignore file */
import { ReactNode } from 'react';
import { Type, Tag } from '../heading/heading';


export interface AccordionSingleProps {
    children: ReactNode;
    defaultExpandedItemId?: string;
    disabledItems?: string[];
}

export interface AccordionMultiProps {
    children: ReactNode;
    defaultExpandedItemIds?: string[];
    disabledItems?: string[];
}

export interface AccordionProps {
    /** Title Label */
    title: string;
    /** Unique Id for Accessibility implementation */
    id: string;
    type?: Type;
    tag?: Tag;
    /** Property deoesn't use value */
    noMargin?: boolean;
    isExpanded?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
}

export interface AccordionItemProps {
    headerId: string;
    panelId: string;
    title: string;
    type: Type;
    tag?: Tag;
    noMargin?: boolean;
    isExpanded?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
    children: ReactNode;
}