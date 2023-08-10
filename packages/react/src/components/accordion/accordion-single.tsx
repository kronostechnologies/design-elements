import React, { useState } from 'react';
import { AccordionProps, AccordionGroupProps  } from './accordion-types';
import { StyledAccordionGroup } from './accordion-styles';


// SingleOpenAccordionGroup
export const SingleOpenAccordionGroup: React.FC<AccordionGroupProps> = ({ children, defaultExpandedItemId }) => {
    const [expandedItemId, setExpandedItemId] = useState<string | null>(defaultExpandedItemId || null);
  
    const handleToggle = (itemId: string) => {
      setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
    };
  
    return (
      <StyledAccordionGroup className="accordion">
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement<AccordionProps>(child)) {
            const accordionProps: AccordionProps = {
              ...child.props,
              isExpanded: child.props.id === expandedItemId,
              onToggle: () => handleToggle(child.props.id),
            };
            return React.cloneElement(child, accordionProps);
          }
          return null;
        })}
      </StyledAccordionGroup>
    );
  };