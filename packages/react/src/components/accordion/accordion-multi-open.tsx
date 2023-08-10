import React, { useState } from 'react';
import { AccordionProps, AccordionGroupProps  } from './accordion-types';
import { StyledAccordionGroup } from './accordion-styles';

export const MultiOpenAccordionGroup: React.FC<AccordionGroupProps> = ({ children, defaultExpandedItemIds }) => {
    const [expandedItemIds, setExpandedItemIds] = useState<string[]>(defaultExpandedItemIds || []);
  
    const handleToggle = (itemId: string) => {
      setExpandedItemIds((prevIds) =>
        prevIds.includes(itemId) ? prevIds.filter((id) => id !== itemId) : [...prevIds, itemId]
      );
    };
  
    return (
      <StyledAccordionGroup className="accordion">
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement<AccordionProps>(child)) {
            const accordionProps: AccordionProps = {
              ...child.props,
              isExpanded: expandedItemIds.includes(child.props.id),
              onToggle: () => handleToggle(child.props.id),
            };
            return React.cloneElement(child, accordionProps);
          }
          return null;
        })}
      </StyledAccordionGroup>
    );
  };