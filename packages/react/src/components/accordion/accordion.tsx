import React, { useCallback, useState, createRef, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { Type, Tag } from '../heading/heading';
import { AccordionItem } from './accordion-item';

interface AccordionProps {
    id?: string;
    children: React.ReactNode;
    mode?: 'single' | 'multi';
}

interface AccordionItemProps {
    title: string;
    id?: string;
    headingType?: Type | undefined;
    headingTag?: Tag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    onToggle?: () => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode;
    buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
}

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const isAccordion = (child: React.ReactNode): child is React.ReactElement<AccordionItemProps> => (
    React.isValidElement<AccordionItemProps>(child) && child.type === AccordionItem);

export const Accordion: React.FC<AccordionProps> = ({
    id: providedId,
    mode = 'single',
    children,
}) => {
    const id = useMemo(() => providedId || uuid(), [providedId]);

    const accordionItems = useMemo(
        () => React.Children.toArray(children).filter(isAccordion),
        [children],
    );

    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(() => (
        accordionItems
            .map((child, index) => {
                const childProps = child.props;
                const uniqueId = `${id}-${index}`;
                return childProps.expanded ? uniqueId : null;
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
        },
        [mode, setExpandedItemIds],
    );

    const childrenArray: React.ReactElement<AccordionItemProps>[] = useMemo(
        () => accordionItems.map((child, index) => {
            const buttonRef = createRef<HTMLButtonElement>();
            const childProps = child.props;
            const uniqueId = `${id}-${index}`;
            const accordionProps: AccordionItemProps = {
                ...childProps,
                buttonRef,
                id: uniqueId,
                onToggle: () => handleToggle(uniqueId),
            };
            return React.cloneElement(child, accordionProps);
        }),
        [accordionItems, id, handleToggle],
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
                    newIndex = childrenArray.length - 1;
                }
            } else {
                newIndex = (index + 1) % childrenArray.length;
            }

            while (childrenArray[newIndex]?.props?.disabled) {
                newIndex = key === 'ArrowUp' ? newIndex - 1 : (newIndex + 1) % childrenArray.length;
                if (newIndex < 0) {
                    newIndex = childrenArray.length - 1;
                }
            }

            childrenArray[newIndex]?.props?.buttonRef?.current?.focus();
        }
    };

    return (
        <StyledAccordionGroup>
            {childrenArray.map((accordion, index) => {
                const { id: uniqueId, ...restProps } = accordion.props;
                const isExpanded = uniqueId ? expandedItemIds.includes(uniqueId) : false;
                const accordionItemProps: AccordionItemProps = {
                    ...restProps,
                    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => handleButtonKeyDown(event, index),
                    expanded: isExpanded,
                    onToggle: accordion.props.onToggle,
                    buttonRef: accordion.props.buttonRef,
                    disabled: accordion.props.disabled,
                };
                return React.cloneElement(accordion, accordionItemProps);
            })}
        </StyledAccordionGroup>
    );
};
