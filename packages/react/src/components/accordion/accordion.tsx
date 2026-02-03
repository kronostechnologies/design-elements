import React, { createRef, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { type HeadingTag, type HeadingType } from '../heading';
import { AccordionItem } from './accordion-item';

export interface ItemsProps {
    title: string;
    content: React.ReactNode | React.ReactElement;
    id?: string;
    headingType?: HeadingType | undefined;
    headingTag?: HeadingTag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
}

interface AccordionProps {
    className?: string;
    id?: string;
    items: ItemsProps[];
    mode?: 'single' | 'multi';
    onToggle?: (itemId: string, expanded: boolean) => void;
}

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const Accordion: React.FC<AccordionProps> = ({
    className,
    id: providedId,
    mode = 'single',
    items,
    onToggle,
}) => {
    const id = useMemo(() => providedId || uuid(), [providedId]);

    const buttonRefs: React.RefObject<HTMLButtonElement>[] = useMemo(
        () => items.map(() => createRef<HTMLButtonElement>()),
        [items],
    );

    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(() => (
        items
            .map((item) => {
                const uniqueId = `${id}-${item.title.replace(/\s+/g, '-')}`;
                return item.expanded ? uniqueId : null;
            })
            .filter((expandedId) => expandedId !== null) as string[]
    ));

    const handleToggle = useCallback(
        (itemId: string): void => {
            if (mode === 'single') {
                setExpandedItemIds((prevIds) => (prevIds.includes(itemId) ? [] : [itemId]));
            } else if (mode === 'multi') {
                setExpandedItemIds((prevIds) => {
                    if (prevIds.includes(itemId)) {
                        return prevIds.filter((expandedId) => expandedId !== itemId);
                    }
                    return [...prevIds, itemId];
                });
            }
            onToggle?.(itemId, !expandedItemIds.includes(itemId));
        },
        [mode, onToggle, expandedItemIds, setExpandedItemIds],
    );

    const handleButtonKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
        index: number,
    ): void => {
        const { key } = event;
        if (key === 'ArrowUp' || key === 'ArrowDown') {
            event.preventDefault();
            let newIndex;
            if (key === 'ArrowUp') {
                newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = items.length - 1;
                }
            } else {
                newIndex = (index + 1) % items.length;
            }

            while (items[newIndex]?.disabled) {
                newIndex = key === 'ArrowUp' ? newIndex - 1 : (newIndex + 1) % items.length;
                if (newIndex < 0) {
                    newIndex = items.length - 1;
                }
            }

            const button = buttonRefs[newIndex].current;
            if (button) {
                button.focus();
            }
        }
    };

    return (
        <StyledAccordionGroup className={className}>
            {items.map((item, index) => {
                const uniqueId = `${id}-${item.title.replace(/\s+/g, '-')}`;
                return (
                    <AccordionItem
                        key={uniqueId}
                        id={uniqueId}
                        title={item.title}
                        content={item.content}
                        expanded={expandedItemIds.includes(uniqueId)}
                        disabled={item.disabled}
                        buttonRef={buttonRefs[index]}
                        headingType={item.headingType}
                        headingTag={item.headingTag}
                        onToggle={() => handleToggle(uniqueId)}
                        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => handleButtonKeyDown(event, index)}
                    />
                );
            })}
        </StyledAccordionGroup>
    );
};

Accordion.displayName = 'Accordion';
