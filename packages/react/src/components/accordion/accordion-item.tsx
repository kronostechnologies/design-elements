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

    return (
        <>
            <StyledHeading type={type || 'medium'} tag={tag || 'h3'} noMargin>
                <StyledButton
                    id={headerId}
                    className={expanded ? 'expanded' : ''}
                    buttonType="tertiary"
                    label={title}
                    aria-expanded={expanded || false}
                    aria-controls={panelId}
                    onClick={onToggle}
                    expanded={expanded || false}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    ref={buttonRef}
                >
                    <Icon name={expanded ? 'caretDown' : 'caretRight'} aria-hidden="true" />
                </StyledButton>
            </StyledHeading>
            <AccordionSection
                className={expanded ? 'expanded' : ''}
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={expanded || false}
                role="region"
                expanded={expanded}
                aria-disabled={disabled}
            >
                <AccordionBody
                    expanded={expanded || false}
                >
                    {children}
                </AccordionBody>
            </AccordionSection>
        </>
    );
};
