import React, { useCallback, useState, ReactElement, createRef, useMemo } from 'react';
import { AccordionProps, AccordionContainerProps } from './accordion-types';
import { Accordion } from './accordion';
import { StyledAccordionGroup } from './accordion-styles';

export const AccordionContainer: React.FC<AccordionContainerProps> = ({
    id, mode = 'single', children,
}) => {
    const generateId = useCallback(
        (childProps: AccordionProps, index: number): string => childProps.id || `${id}-${index}`,
        [id],
    );

    const isAccordion = (child: React.ReactNode): child is ReactElement<AccordionProps> => (
        React.isValidElement<AccordionProps>(child) && child.type === Accordion);

    const filteredChildren = React.Children.toArray(children).filter(isAccordion);

    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(() => (
        filteredChildren
            .map((child, index) => {
                const childProps = child.props;
                return childProps.isExpanded ? generateId(childProps, index) : null;
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

    const childrenArray: ReactElement<AccordionProps>[] = useMemo(
        () => filteredChildren.map((child, index) => {
            const buttonRef = createRef<HTMLButtonElement>();
            const childProps = child.props;
            const accordionId = generateId(childProps, index);
            const accordionProps: AccordionProps = {
                ...childProps,
                buttonRef,
                id: accordionId,
                onToggle: () => handleToggle(accordionId),
            };
            return React.cloneElement(child, accordionProps);
        }),
        [filteredChildren, generateId, handleToggle],
    );

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
            childrenArray[newIndex]?.props?.buttonRef?.current?.focus();
        }
    };

    return (
        <StyledAccordionGroup className='accordion'>
            {childrenArray.map((accordion, index) => {
                const { id: accordionId, ...restProps } = accordion.props;
                const isExpanded = accordionId ? expandedItemIds.includes(accordionId) : false;
                const accordionProps: AccordionProps = {
                    ...restProps,
                    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => handleButtonKeyDown(event, index),
                    isExpanded,
                    onToggle: accordion.props.onToggle,
                    buttonRef: accordion.props.buttonRef,
                    disabled: accordion.props.disabled,
                };
                return React.cloneElement(accordion, accordionProps);
            })}
        </StyledAccordionGroup>
    );
};
