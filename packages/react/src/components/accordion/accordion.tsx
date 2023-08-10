import React from 'react';
import styled from 'styled-components';
import { AccordionProps, AccordionItemProps  } from './accordion-types';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading } from '../heading/heading';

export const Accordion: React.FC<AccordionProps> = ({ 
        title, 
        id, 
        type = 'medium',
        tag = "h3",
        noMargin,
        isExpanded = false,
        onToggle = () => {},
        children,
    }) => {

        const headerId = `idHeader${id}`;
        const panelId = `idPanel${id}`;

        return (
            <AccordionItem
            headerId={headerId}
            panelId={panelId}
            title={title}
            type = {type}
            tag= {tag}
            noMargin={noMargin}
            isExpanded={isExpanded}
            onToggle={onToggle}
            >
            {children}
            </AccordionItem>
        );
};

const AccordionSection = styled.section<{ isExpanded: boolean }>`
    min-height: 0;
    overflow: hidden;
    height: ${props => (props.isExpanded ? 'auto' : '0')}; 
    border: ${props => (props.isExpanded ? `1px solid ${props.theme.greys.black}` : '0')};
    border-top-width: 0;
    margin-bottom: 8px;
    border-radius: 0 0 4px 4px;
    padding: ${props => (props.isExpanded ? '16px 24px 24px 40px' : '0')};
    background: ${(props) => props.theme.greys['colored-white']};
    transition: height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms; 
    font-size: 0.75rem;
    line-height: 1.5;
    letter-spacing: 0.24px;
    font-weight: 400;
`;

const StyledHeading = styled(Heading)<{ isExpanded: boolean }>`
    border: 1px solid ${(props) => props.theme.greys.black};
    border-bottom-color: ${props => (props.isExpanded ? props.theme.greys.grey : props.theme.greys.black)};
    border-radius: ${props => (props.isExpanded ? '4px 4px 0px 0px' : '4px')};
`;

const StyledButton = styled(Button)<{ isExpanded: boolean }>`
    width: 100%;
    border-radius: ${props => (props.isExpanded ? '4px 4px 0px 0px' : '4px')};
    padding: 8px 24px 8px 8px;
    justify-content: start;
    &[aria-expanded="true"]{
        background: ${(props) => props.theme.greys.white};
    }
    > svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }
`;

const AccordionItem: React.FC<AccordionItemProps> = ({
    headerId,
    panelId,
    title,
    type,
    isExpanded = false, // Default to false if not provided
    onToggle = () => {}, // Empty function if not provided
    children,
    ...props
  }) => {
    
    return (
      <>
        <StyledHeading type={type} {...props} isExpanded={isExpanded}>
        
          <StyledButton
            id={headerId}
            buttonType="tertiary"
            label={title}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={onToggle}
            isExpanded={isExpanded}
          >
            <Icon name={isExpanded ? 'chevronDown' : 'chevronRight'} aria-hidden="true"/>
          </StyledButton>
        </StyledHeading>
        <AccordionSection 
            id={panelId} 
            aria-labelledby={headerId} 
            aria-expanded={isExpanded} 
            role="region"
            isExpanded={isExpanded}>
          {children}
        </AccordionSection>
      </>
    );
};