import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

type StyledFunction = (isExpanded: boolean, theme: Theme) => ReturnType<typeof css>;
type AccordionSectionFunction = (theme: Theme) => ReturnType<typeof css>;

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const AccordionSectionStyled: AccordionSectionFunction = (theme) => css`
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

export const AccordionBodyStyled: AccordionSectionFunction = (theme) => css`
    background: ${theme.greys['colored-white']};
    color: ${theme.greys['neutral-100']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 1.7;
    padding: var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x);
`;

export const HeadingStyled = css`
    position: relative;
`;

export const ButtonStyled: StyledFunction = (isExpanded, theme) => css`
    align-items: flex-start;
    border: 1px solid ${theme.greys['neutral-15']};
    border-radius: ${isExpanded ? 'var(--border-radius-2x) var(--border-radius-2x) 0 0' : 'var(--border-radius-2x)'};
    color: ${theme.greys['neutral-100']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 1.5;
    min-height: var(--spacing-5x); /* TODO change space when updating thematization */
    padding: var(--spacing-1x); /* TODO change space when updating thematization */
    text-align: left;
    text-transform: none;
    transition: border-radius 0.2s ease;
    width: 100%;
    &:hover, /* TODO change colors when updating thematization */
    &[aria-expanded='true'] {/* TODO change colors when updating thematization */
        background: ${theme.greys['neutral-15']};
        color: ${theme.greys['neutral-100']};
        transition: border-radius 0.2s ease;
    }
    &:focus { /* TODO change colors when updating thematization */
        box-shadow: ${theme.tokens['focus-box-shadow-inset']};
        color: ${theme.greys['neutral-100']};
    }
    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px; /* TODO change space when updating thematization */
        width: 1rem;
    }
    &:disabled { /* TODO change colors when updating thematization */
        background-color: ${theme.greys['neutral-05']};
        &:hover {
            color: ${theme.greys['neutral-30']};
        }
        > svg {
            color: ${theme.greys['neutral-30']};
        }
    }
`;
