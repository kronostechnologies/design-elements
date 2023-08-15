import React, { useState } from 'react';
import { AccordionProps, AccordionSingleProps  } from './accordion-types';
import { Accordion } from './accordion';
import { StyledAccordionGroup } from './accordion-styles';


// SingleOpenAccordionGroup
export const SingleOpenAccordionGroup: React.FC<AccordionSingleProps> = ({ children, defaultExpandedItemId, disabledItems = [] }) => {
    const [expandedItemId, setExpandedItemId] = useState<string | null>(defaultExpandedItemId || null);
    const handleToggle = (itemId: string) => {
      setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
    };

    return (
      <StyledAccordionGroup className="accordion">
        {React.Children.map(children, (child: React.ReactNode) => {
          if (React.isValidElement<AccordionProps>(child) && child.type === Accordion) {
            const accordionProps: AccordionProps = {
              ...child.props,
              isExpanded: child.props.id === expandedItemId,
              onToggle: () => handleToggle(child.props.id),
              disabled: disabledItems.includes(child.props.id),
            };
            return React.cloneElement(child, accordionProps);
          }
          return null;
        })}
      </StyledAccordionGroup>
    );
  };