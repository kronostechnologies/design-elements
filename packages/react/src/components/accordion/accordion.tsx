import React from 'react';
import styled from 'styled-components';
import { AccordionProps } from './accordion-types';
import { AccordionSectionStyled, HeadingStyled, ButtonStyled } from './accordion-styles';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading } from '../heading/heading';

const AccordionSection = styled.section<{ isExpanded: boolean }>`
    ${({ isExpanded, theme }) => AccordionSectionStyled(isExpanded, theme)};
`;

const StyledHeading = styled(Heading)`
    ${HeadingStyled()};
`;

const StyledButton = styled(Button)<{ isExpanded: boolean }>`
    ${({ isExpanded, theme }) => ButtonStyled(isExpanded, theme)};
`;

export const Accordion: React.FC<AccordionProps> = ({
    title,
    id,
    type = 'medium',
    tag = 'h3',
    isExpanded = false,
    onToggle = () => {},
    disabled,
    children,
    onKeyDown,
    buttonRef,
}) => {
    const headerId = `idHeader${id}`;
    const panelId = `idPanel${id}`;

    return (
        <>
            <StyledHeading className="accordion-header" type={type} tag={tag} noMargin>
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
                    onKeyDown={onKeyDown}
                    ref={buttonRef}>
                        <Icon name={isExpanded ? 'carretDown' : 'carretRight'} aria-hidden="true" />
                </StyledButton>
            </StyledHeading>
            <AccordionSection
                className="accordion-content"
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={isExpanded}
                role="region"
                isExpanded={isExpanded}
                aria-disabled={disabled}
            >
                {children}
            </AccordionSection>
        </>
    );
};
