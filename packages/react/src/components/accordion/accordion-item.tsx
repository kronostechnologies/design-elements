import React from 'react';
import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading, Type, Tag } from '../heading/heading';

export interface AccordionItemProps {
    title: string;
    id?: string;
    headingType?: Type | undefined;
    headingTag?: Tag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    onToggle?: () => void;
    onKeyDown?: ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined;
    content: React.ReactNode | React.ReactElement;
    buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
}

const AccordionSection = styled.section<{ theme: ResolvedTheme }>`
    background: ${({ theme }) => theme.component['accordion-content-background-color']};
    border-color: ${({ theme }) => theme.component['accordion-content-border-color']};
    border-radius: 0 0 var(--border-radius-2x) var(--border-radius-2x);
    border-style: solid;
    border-width: 0;
    margin-bottom: var(--spacing-1x);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, border-width 0.5s ease;
    &[aria-expanded='true'] {
        border-width: 0 1px 1px 1px;
        max-height: 1000px;
        overflow-y: auto;
        transform: translateZ(0);
        transition: max-height 0.5s ease, border-width 0s ease;
        will-change: max-height, border-width;
    }
`;

const AccordionBody = styled.div<{ theme: ResolvedTheme }>`
    background: ${({ theme }) => theme.component['accordion-content-background-color']};
    color: ${({ theme }) => theme.component['accordion-content-color']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 1.7;
    padding: var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x);
    > *:first-child {
        margin-top: 0px;
        padding-top: 0px;
    }
    > *:last-child {
        margin-bottom: 0px;
        padding-bottom: 0px;
    }
`;

const HeadingStyled = styled(Heading)`
    position: relative;
`;

const ButtonStyled = styled(Button)<{ theme: ResolvedTheme }>`
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.component['accordion-header-border-color']};
    border-radius: var(--border-radius-2x);
    color: ${({ theme }) => theme.component['accordion-header-color']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 1.5;
    min-height: var(--spacing-5x);
    padding: var(--spacing-1x);
    text-align: left;
    text-transform: none;
    transition-delay: 0.5s;
    transition-duration: 0.2s;
    transition-property: border-radius;
    transition-timing-function: ease;
    width: 100%;

    &[aria-expanded='true'] {
        background: ${({ theme }) => theme.component['accordion-header-extended-background-color']};
        border-radius: var(--border-radius-2x) var(--border-radius-2x) 0 0;
        color: ${({ theme }) => theme.component['accordion-header-extended-color']};
        transition-delay: 0s;
        transition-duration: 0.1s;
        transition-property: border-radius;
        transition-timing-function: ease;
    }

    &:focus {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.component['accordion-header-focus-box-shadow-inset-color']};
        color: ${({ theme }) => theme.component['accordion-header-focus-color']};
    }

    &:hover {
        background: ${({ theme }) => theme.component['accordion-header-hover-background-color']};
        border-color: ${({ theme }) => theme.component['accordion-header-hover-border-color']};
        color: ${({ theme }) => theme.component['accordion-header-hover-color']};
    }

    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px;
        width: 1rem;
    }

    &:disabled {
        background-color: ${({ theme }) => theme.component['accordion-header-disabled-background-color']};
        &:hover {
            border-color: ${({ theme }) => theme.component['accordion-header-disabled-hover-border-color']};
            color: ${({ theme }) => theme.component['accordion-header-disabled-hover-color']};
        }
        > svg {
            color: ${({ theme }) => theme.component['accordion-header-disabled-svg-color']};
        }
    }
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    id,
    headingType = 'medium',
    headingTag = 'h3',
    expanded = false,
    onToggle,
    disabled,
    content,
    onKeyDown,
    buttonRef,
}) => {
    const headerId = id;
    const panelId = `panel-${id}`;

    return (
        <>
            <HeadingStyled type={headingType} tag={headingTag} noMargin>
                <ButtonStyled
                    id={headerId}
                    buttonType="tertiary"
                    label={title}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={onToggle}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    ref={buttonRef}
                >
                    <Icon name={expanded ? 'caretDown' : 'caretRight'} aria-hidden="true" />
                </ButtonStyled>
            </HeadingStyled>
            <AccordionSection
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={expanded}
                aria-disabled={disabled}
            >
                <AccordionBody>
                    {content}
                </AccordionBody>
            </AccordionSection>
        </>
    );
};
