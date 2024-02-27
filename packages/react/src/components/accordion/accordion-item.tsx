import React from 'react';
import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';
import { Button } from '../buttons/button';
import { Icon } from '../icon/icon';
import { Heading, Type, Tag } from '../heading/heading';
import { focus } from '../../utils/css-state';

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
    background: ${({ theme }) => theme.greys['colored-white']};
    border-color: ${({ theme }) => theme.greys.grey};
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
        transition: max-height 0.5s ease, border-width 0s ease;
        will-change: max-height, border-width;
    }
`;

const AccordionBody = styled.div<{ theme: ResolvedTheme }>`
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

const ButtonStyled = styled(Button)<{ theme: ResolvedTheme }>`
    align-items: flex-start;
    border: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: var(--border-radius-2x);
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
    transition: border-radius 0.2s ease 0.5s;
    width: 100%;

    &[aria-expanded='true'] {
        background: ${({ theme }) => theme.greys.white};
        border-color: ${({ theme }) => theme.greys.grey};
        border-radius: var(--border-radius-2x) var(--border-radius-2x) 0 0;
        color: ${({ theme }) => theme.greys['neutral-90']};
        transition: border-radius 0.1s ease;
    }

    ${focus};

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
        border-color: ${({ theme }) => theme.greys.grey};
        &:hover {
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
