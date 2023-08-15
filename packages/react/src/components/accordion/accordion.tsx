import React from 'react';
import styled from 'styled-components';
import { AccordionProps, AccordionItemProps  } from './accordion-types';
import { AccordionSectionStyled,  HeadingStyled, ButtonStyled } from './accordion-styles';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading } from '../heading/heading';

export const Accordion: React.FC<AccordionProps> = ({ 
        title, 
        id, 
        type = 'medium',
        tag = "h3",
        noMargin,
        isExpanded,
        onToggle = () => {},
        disabled,
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
            disabled={disabled}
            onToggle={onToggle}
            >
            {children}
            </AccordionItem>
        );
};


const AccordionSection = styled.section<{ isExpanded: boolean }>`
  ${({ isExpanded, theme }) => AccordionSectionStyled(isExpanded, theme)};
`
const StyledHeading = styled(Heading)<{ isExpanded: boolean }>`
  ${({ isExpanded, theme }) => HeadingStyled(isExpanded, theme)};
`
const StyledButton = styled(Button)<{ isExpanded: boolean }>`
${({ isExpanded, theme }) => ButtonStyled(isExpanded, theme)};
`

export const AccordionItem: React.FC<AccordionItemProps> = ({
    headerId,
    panelId,
    title,
    type,
    isExpanded = false, 
    onToggle = () => {}, 
    children,
    ...props
  }) => {

    const { disabled = false } = props;

    return (
      <>
        <StyledHeading className="accordion-header" type={type} {...props} isExpanded={isExpanded}>
          <StyledButton
            id={headerId}
            className="accordion-button"
            buttonType="tertiary"
            label={title}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            onClick={() => onToggle()}
            isExpanded={isExpanded}
            disabled={disabled}
          >
            <Icon name={isExpanded ? 'carretDown' : 'carretRight'} aria-hidden="true"/>
          </StyledButton>
        </StyledHeading>
        
        <AccordionSection 
            className="accordion-content"
            id={panelId} 
            aria-labelledby={headerId} 
            aria-expanded={isExpanded} 
            role="region"
            isExpanded={isExpanded}
            aria-disabled={disabled}>
          {children}
        </AccordionSection>
      </>
    );
};