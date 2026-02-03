import React from 'react';
import styled from 'styled-components';
import { type ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { Button } from '../buttons';
import { Heading, type HeadingTag, type HeadingType } from '../heading';
import { Icon } from '../icon';
import { accordionClasses } from './accordion-classes';

export interface AccordionItemProps {
    title: string;
    id?: string;
    headingType?: HeadingType | undefined;
    headingTag?: HeadingTag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    onToggle?: () => void;
    onKeyDown?: ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined;
    content: React.ReactNode | React.ReactElement;
    buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
}

const AccordionItemContainer = styled.div`
    &:not(:first-child) {
        margin-top: var(--spacing-1x);
    }
`;

const AccordionPanel = styled.section<{ theme: ResolvedTheme }>`
    background: ${({ theme }) => theme.component['accordion-panel-background-color']};
    border-color: ${({ theme }) => theme.component['accordion-panel-border-color']};
    border-radius: 0 0 var(--border-radius-2x) var(--border-radius-2x);
    border-style: solid;
    border-width: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, border-width 0.5s ease;

    &[aria-expanded='true'] {
        border-width: 0 1px 1px 1px;
        max-height: 1000px;
        overflow-y: auto;
        transition: max-height 0.5s ease, border-width 0s ease;
        will-change: max-height, border-width;
    }
`;

const AccordionContent = styled.div<{ theme: ResolvedTheme }>`
    background: ${({ theme }) => theme.component['accordion-panel-background-color']};
    color: ${({ theme }) => theme.component['accordion-panel-text-color']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 1.7;
    padding: var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x);

    > *:first-child {
        margin-top: 0;
        padding-top: 0;
    }

    > *:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
`;

const HeadingStyled = styled(Heading)`
    position: relative;
`;

const ButtonStyled = styled(Button)<{ theme: ResolvedTheme }>`
    align-items: center;
    background: ${({ theme }) => theme.component['accordion-header-background-color']};
    border: 1px solid ${({ theme }) => theme.component['accordion-header-border-color']};
    border-radius: var(--border-radius-2x);
    color: ${({ theme }) => theme.component['accordion-header-text-color']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 1.5;
    min-height: var(--spacing-5x);
    padding: var(--spacing-1x);
    text-align: left;
    text-transform: none;
    transition: border-radius 0.2s ease 0.5s;
    width: 100%;

    &[aria-expanded='true'] {
        background: ${({ theme }) => theme.component['accordion-header-background-color']};
        border: 1px solid ${({ theme }) => theme.component['accordion-header-border-color']};
        border-radius: var(--border-radius-2x) var(--border-radius-2x) 0 0;
        color: ${({ theme }) => theme.component['accordion-header-text-color']};
        transition: border-radius 0.1s ease;
    }

    ${focus};

    &:hover {
        background: ${({ theme }) => theme.component['accordion-header-hover-background-color']};
        border-color: ${({ theme }) => theme.component['accordion-header-hover-border-color']};
        color: ${({ theme }) => theme.component['accordion-header-hover-text-color']};
    }

    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px;
        width: 1rem;
    }

    &:disabled {
        background-color: ${({ theme }) => theme.component['accordion-header-disabled-background-color']};
        &:hover {
            border-color: ${({ theme }) => theme.component['accordion-header-disabled-border-color']};
            color: ${({ theme }) => theme.component['accordion-header-disabled-text-color']};
        }
        > svg {
            color: ${({ theme }) => theme.component['accordion-header-disabled-icon-color']};
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
        <AccordionItemContainer>
            <HeadingStyled
                className={accordionClasses.heading}
                type={headingType}
                tag={headingTag}
                noMargin
            >
                <ButtonStyled
                    id={headerId}
                    buttonType="tertiary"
                    className={accordionClasses.button}
                    label={title}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={onToggle}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    ref={buttonRef}
                >
                    <Icon
                        className={accordionClasses.buttonIcon}
                        name={expanded ? 'chevronDown' : 'chevronRight'}
                        aria-hidden="true"
                    />
                </ButtonStyled>
            </HeadingStyled>
            <AccordionPanel
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={expanded}
                aria-disabled={disabled}
                className={accordionClasses.panel}
            >
                <AccordionContent className={accordionClasses.content}>
                    {content}
                </AccordionContent>
            </AccordionPanel>
        </AccordionItemContainer>
    );
};

AccordionItem.displayName = 'AccordionItem';
