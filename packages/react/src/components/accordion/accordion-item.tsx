import React from 'react';
import styled from 'styled-components';
import { AccordionItemProps, AccordionBodyProps } from './accordion-types';
import { accordionSectionStyled, accordionBodyStyled, headingStyled, buttonStyled } from './accordion-styles';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading } from '../heading/heading';

const AccordionSection = styled.section<AccordionBodyProps>`
    ${({ theme }) => accordionSectionStyled(theme)};
`;

const AccordionBody = styled.div<AccordionBodyProps>`
    ${({ theme }) => accordionBodyStyled(theme)};
`;

const StyledHeading = styled(Heading)`
    ${headingStyled};
`;

const StyledButton = styled(Button)<{ expanded: boolean }>`
    ${({ expanded, theme }) => buttonStyled(expanded, theme)};
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    id,
    type,
    tag,
    expanded,
    onToggle,
    disabled,
    children,
    onKeyDown,
    buttonRef,
}) => {
    const headerId = id;
    const panelId = `panel-${id}`;

    const itemType = type ?? 'medium';
    const itemTag = tag ?? 'h3';
    const isExpanded = expanded ?? false;

    return (
        <>
            <StyledHeading type={itemType} tag={itemTag} noMargin>
                <StyledButton
                    id={headerId}
                    className={isExpanded ? 'expanded' : ''}
                    buttonType="tertiary"
                    label={title}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={onToggle}
                    expanded={isExpanded}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    ref={buttonRef}
                >
                    <Icon name={isExpanded ? 'caretDown' : 'caretRight'} aria-hidden="true" />
                </StyledButton>
            </StyledHeading>
            <AccordionSection
                className={isExpanded ? 'expanded' : ''}
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={isExpanded}
                role="region"
                expanded={isExpanded}
                aria-disabled={disabled}
            >
                <AccordionBody
                    expanded={isExpanded}
                >
                    {children}
                </AccordionBody>
            </AccordionSection>
        </>
    );
};
