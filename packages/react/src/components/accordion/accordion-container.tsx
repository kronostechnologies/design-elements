import React, { useState, ReactElement, createRef, useRef } from 'react';
import { AccordionProps, AccordionContainerProps } from './accordion-types';
import { Accordion } from './accordion';
import { StyledAccordionGroup } from './accordion-styles';

export const AccordionContainer: React.FC<AccordionContainerProps> = ({
    mode = 'single', children, defaultExpandedItemIds, disabledItemIds = [],
}) => {
    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(defaultExpandedItemIds || []);
    const focusedAccordionRef = useRef<number | null>(null);

    const handleToggle = (itemId: string): void => {
        if (mode === 'single') {
            setExpandedItemIds((prevIds) => (prevIds.includes(itemId) ? [] : [itemId]));
        } else if (mode === 'multi') {
            setExpandedItemIds((prevIds) => {
                if (prevIds.includes(itemId)) {
                    return prevIds.filter((id) => id !== itemId);
                }
                return [...prevIds, itemId];
            });
        }
    };

    const childrenArray: ReactElement<AccordionProps>[] = React.Children.toArray(children)
        .filter((child): child is ReactElement<AccordionProps> => {
            if (React.isValidElement<AccordionProps>(child)) {
                return child.type === Accordion;
            }
            return false;
        })
        .map((child: ReactElement<AccordionProps>) => {
            const buttonRef = createRef<HTMLButtonElement>();
            const childProps = child.props as AccordionProps;
            const modifiedProps: AccordionProps = {
                ...childProps,
                buttonRef,
            };
            return React.cloneElement(child, modifiedProps);
        });

    const handleButtonKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
        index: number,
    ): void => {
        const { key } = event;
        if (key === 'ArrowUp' || key === 'ArrowDown') {
            let newIndex;
            if (key === 'ArrowUp') {
                newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = childrenArray.length - 1;
                }
            } else {
                newIndex = (index + 1) % childrenArray.length;
            }
            focusedAccordionRef.current = newIndex;
            childrenArray[newIndex]?.props?.buttonRef?.current?.focus();
        }
    };

    return (
        <StyledAccordionGroup className='accordion'>
            {childrenArray.map((accordion, index) => {
                const isAccordionExpanded = expandedItemIds.includes(accordion.props.id);
                const isDisabled = disabledItemIds?.includes(accordion.props.id);
                const accordionProps: AccordionProps = {
                    ...accordion.props,
                    isExpanded: isAccordionExpanded,
                    onToggle: () => handleToggle(accordion.props.id),
                    disabled: isDisabled,
                    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => handleButtonKeyDown(event, index),
                };
                return React.cloneElement(accordion, accordionProps);
            })}
        </StyledAccordionGroup>
    );
};
