import React, { useState, ReactElement, useMemo, createRef, useRef} from 'react';
import { AccordionProps, AccordionContainerProps } from './accordion-types';
import { Accordion } from './accordion';
import { StyledAccordionGroup } from './accordion-styles';

export const AccordionContainer: React.FC<AccordionContainerProps> = ({ mode = "single", children, defaultExpandedItemIds, disabledItemIds = [] }) => {
    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(defaultExpandedItemIds || []);
    const focusedAccordionRef = useRef<number | null>(null);

    const handleToggle = (itemId: string) => {
        if (mode.toLowerCase() ===  "single") {
            setExpandedItemIds((prevIds) => (prevIds.includes(itemId) ? [] : [itemId]));
        } else if (mode.toLowerCase() ===  "multi") {
            setExpandedItemIds((prevIds) => {
                if (prevIds.includes(itemId)) {
                    return prevIds.filter((id) => id !== itemId);
                } else {
                    return [...prevIds, itemId];
                }
            });
        }
    };

    const childrenArray: React.ReactNode[] = React.Children.toArray(children);
    const accordionItems: ReactElement<AccordionProps>[] = useMemo(
        () =>
          childrenArray.map((child: React.ReactNode, index: number) => {
            if (React.isValidElement<AccordionProps>(child) && child.type === Accordion) {
              const buttonRef = createRef<HTMLButtonElement>();
              const childProps = child.props as AccordionProps;
              const modifiedProps: AccordionProps = {
                ...childProps,
                buttonRef: buttonRef,
                onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) =>
                  handleButtonKeyDown(event, index), // Pass the index here
              };
              return React.cloneElement(child, modifiedProps);
            }
            return;
          }).filter(Boolean) as ReactElement<AccordionProps>[],
        [childrenArray]
    );

    const handleButtonKeyDown = (
      event: React.KeyboardEvent<HTMLButtonElement>,
      index: number 
    ) => {
      const { key } = event;
      if (key === "ArrowUp" || key === "ArrowDown") {
          let newIndex;
  
          if (key === "ArrowUp") {
            newIndex = index - 1;
            if (newIndex < 0) {
              newIndex = accordionItems.length - 1; // Go to the last element if at the first
            }
          } else {
            newIndex = (index + 1) % accordionItems.length; // Cycle to the first element if at the last
          }
      
    
        focusedAccordionRef.current = newIndex; // Update the focused index
        accordionItems[newIndex]?.props?.buttonRef?.current?.focus();
      }
    };
  
    return (
      <StyledAccordionGroup className="accordion">
        {accordionItems.map((accordion, index) => {
                const isAccordionExpanded = expandedItemIds.includes(accordion.props.id);
                const isDisabled = disabledItemIds?.includes(accordion.props.id)
                const accordionProps: AccordionProps = {
                ...accordion.props, // Use the accordion item from the array
                isExpanded: isAccordionExpanded,
                onToggle: () => handleToggle(accordion.props.id),
                disabled: isDisabled,
                onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) =>
                    handleButtonKeyDown(event, index),
                };
                return React.cloneElement(accordion, accordionProps);
            })}
      </StyledAccordionGroup>
    );
  };