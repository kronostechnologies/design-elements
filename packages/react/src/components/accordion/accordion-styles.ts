import { css } from 'styled-components';
import { Theme } from '../../themes';

type StyledFunction = (expanded: boolean, theme: Theme) => ReturnType<typeof css>;
type AccordionSectionFunction = (theme: Theme) => ReturnType<typeof css>;

export const styledAccordionGroup = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const accordionSectionStyled: AccordionSectionFunction = (theme) => css`
    background: ${theme.greys['neutral-02']};
    border: 0 solid ${theme.greys['neutral-15']};
    border-radius: 0 0 var(--border-radius-2x) var(--border-radius-2x);
    border-top-width: 0;
    margin-bottom: var(--spacing-1x);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, border 0.5s ease;
    &.expanded {
        border: 1px solid ${theme.greys['neutral-15']};
        border-top-width: 0;
        max-height: 500px;
        transform: translateZ(0);
        transition: max-height 1s ease, border 1s ease;
        will-change: max-height, border;
    }
`;

export const accordionBodyStyled: AccordionSectionFunction = (theme) => css`
    background: ${theme.greys['colored-white']};
    color: ${theme.greys['neutral-90']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 1.7;
    padding: var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x);
`;

export const headingStyled = css`
    position: relative;
`;

export const buttonStyled: StyledFunction = (expanded, theme) => css`
    align-items: flex-start;
    border: 1px solid ${theme.greys['neutral-15']};
    border-radius: ${expanded ? 'var(--border-radius-2x) var(--border-radius-2x) 0 0' : 'var(--border-radius-2x)'};
    color: ${theme.greys['neutral-90']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 1.5;
    min-height: var(--spacing-5x);
    padding: var(--spacing-1x);
    text-align: left;
    text-transform: none;
    transition: border-radius 0.2s ease;
    width: 100%;

    &[aria-expanded='true'] {
        background: ${theme.greys.white};
        color: ${theme.greys['neutral-90']};
        transition: border-radius 0.2s ease;
    }

    &:focus {
        box-shadow: ${theme.tokens['focus-box-shadow-inset']};
        color: ${theme.greys['neutral-90']};
    }

    &:hover {
        background: ${theme.greys['neutral-15']};
        border-color: ${theme.greys['neutral-90']};
        color: ${theme.greys['neutral-90']};
        transition: border-radius 0.2s ease;
    }

    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px;
        width: 1rem;
    }

    &:disabled {
        background-color: ${theme.greys['neutral-05']};
        &:hover {
            color: ${theme.greys['neutral-30']};
        }
        > svg {
            color: ${theme.greys['neutral-30']};
        }
    }
`;
