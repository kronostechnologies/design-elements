import React from 'react';
import styled from 'styled-components';
import { AccordionItemProps, AccordionBodyProps } from './accordion-types';
import { AccordionSectionStyled, AccordionBodyStyled, HeadingStyled, ButtonStyled } from './accordion-styles';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading } from '../heading/heading';

const AccordionSection = styled.section<AccordionBodyProps>`
    ${({ theme }) => AccordionSectionStyled(theme)};
`;

const AccordionBody = styled.div<AccordionBodyProps>`
    ${({ theme }) => AccordionBodyStyled(theme)};
`;

const StyledHeading = styled(Heading)`
    ${HeadingStyled};
`;

const StyledButton = styled(Button)<{ expanded: boolean }>`
    ${({ expanded, theme }) => ButtonStyled(expanded, theme)};
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    id,
    type = 'medium',
    tag = 'h3',
    expanded = false,
    onToggle = () => {},
    disabled,
    children,
    onKeyDown,
    buttonRef,
}) => {
    const headerId = id;
    const panelId = `panel-${id}`;

    return (
        <>
            <StyledHeading className="accordion-header" type={type} tag={tag} noMargin>
                <StyledButton
                    id={headerId}
                    className="accordion-button"
                    buttonType="tertiary"
                    label={title}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={onToggle}
                    expanded={expanded}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    ref={buttonRef}
                >
                    <Icon name={expanded ? 'caretDown' : 'caretRight'} aria-hidden="true" />
                </StyledButton>
            </StyledHeading>
            <AccordionSection
                className={`accordion-content ${expanded ? 'expanded' : ''}`}
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={expanded}
                role="region"
                expanded={expanded}
                aria-disabled={disabled}
            >
                <AccordionBody
                    className="accordion-body"
                    expanded={expanded}
                >
                    {children}
                </AccordionBody>
            </AccordionSection>
        </>
    );
};
