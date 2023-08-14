/* istanbul ignore file */
import { ReactNode } from 'react';
import { Type, Tag } from '../heading/heading';

export interface AccordionGroupProps {
    children: ReactNode;
    defaultExpandedItemId?: string;
    defaultExpandedItemIds?: string[];
  }

export interface AccordionProps {
    /** Title Label */
    title: string;
    /** Id for Accessibility implementation */
    id: string;
    type?: Type;
    tag?: Tag;
    /** Property based on the property name only */
    noMargin?: boolean;
    isExpanded?: boolean;
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
    onToggle?: () => void;
    children: ReactNode;
}