import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading, Type, Tag } from '../heading/heading';

interface AccordionItemProps {
    title: string;
    id?: string;
    headingType?: Type | undefined;
    headingTag?: Tag | undefined;
    expanded?: boolean | undefined;
    disabled?: boolean | undefined;
    onToggle?: () => void;
    onKeyDown?: ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined;
    children: React.ReactNode;
    buttonRef?: React.RefObject<HTMLButtonElement> | undefined;
}

const AccordionSection = styled.section<{ theme: Theme }>`
    background: ${({ theme }) => theme.greys['colored-white']};
    border-color: ${({ theme }) => theme.greys.grey};
    border-radius: 0 0 var(--border-radius-2x) var(--border-radius-2x);
    border-style: solid;
    border-width: 0;
    margin-bottom: var(--spacing-1x);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, border-width 0.5s ease;
    &.expanded {
        border-width: 1px;
        border-top-width: 0;
        max-height: 1000px;
        overflow-y: auto;
        transform: translateZ(0);
        transition: max-height 0.5s ease, border-width 0s ease;
        will-change: max-height, border-width;
    }
`;

const AccordionBody = styled.div<{ theme: Theme }>`
    background: ${({ theme }) => theme.greys['colored-white']};
    color: ${({ theme }) => theme.greys['neutral-90']};
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

const ButtonStyled = styled(Button)<{ theme: Theme, expanded?: boolean }>`
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: ${({ expanded }) => (expanded ? 'var(--border-radius-2x) var(--border-radius-2x) 0 0' : 'var(--border-radius-2x)')};
    color: ${({ theme }) => theme.greys['neutral-90']};
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

    &.expanded {
        background: ${({ theme }) => theme.greys.white};
        color: ${({ theme }) => theme.greys['neutral-90']};
        transition-delay: 0s;
        transition-duration: 0.1s;
        transition-property: border-radius;
        transition-timing-function: ease;
    }

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-box-shadow-inset']};
        color: ${({ theme }) => theme.greys['neutral-90']};
    }

    &:hover {
        background: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys['neutral-90']};
        color: ${({ theme }) => theme.greys['neutral-90']};
    }

    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px;
        width: 1rem;
    }

    &:disabled {
        background-color: ${({ theme }) => theme.greys['light-grey']};
        &:hover {
            border-color: ${({ theme }) => theme.greys.grey};
            color: ${({ theme }) => theme.greys['mid-grey']};
        }
        > svg {
            color: ${({ theme }) => theme.greys['mid-grey']};
        }
    }
`;

export const AccordionItem: React.FC<AccordionItemProps> = ({
    title,
    id,
    headingType,
    headingTag,
    expanded,
    onToggle,
    disabled,
    children,
    onKeyDown,
    buttonRef,
}) => {
    const headerId = id;
    const panelId = `panel-${id}`;

    const itemType = headingType ?? 'medium';
    const itemTag = headingTag ?? 'h3';
    const isExpanded = expanded ?? false;

    return (
        <>
            <HeadingStyled type={itemType} tag={itemTag} noMargin>
                <ButtonStyled
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
                </ButtonStyled>
            </HeadingStyled>
            <AccordionSection
                className={isExpanded ? 'expanded' : ''}
                id={panelId}
                aria-labelledby={headerId}
                aria-expanded={isExpanded}
                aria-disabled={disabled}
            >
                <AccordionBody>
                    {children}
                </AccordionBody>
            </AccordionSection>
        </>
    );
};
