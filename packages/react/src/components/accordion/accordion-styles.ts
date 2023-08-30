import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

type StyledFunction = (isExpanded: boolean, theme: Theme) => ReturnType<typeof css>;

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const AccordionSectionStyled: StyledFunction = (isExpanded, theme) => css`
    background: ${theme.greys['colored-white']};
    border: ${isExpanded ? `1px solid ${theme.greys['neutral-65']}` : '0'};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    border-top-width: 0;
    color: ${theme.greys['neutral-100']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    height: ${isExpanded ? 'auto' : '0'};
    letter-spacing: 0.015rem;
    line-height: 1.7;
    margin-bottom: var(--spacing-1x);
    max-height: ${isExpanded ? '500px' : '0'};
    overflow: hidden;
    padding: ${isExpanded ? 'var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x)' : '0 0 0 0'};
    transition: ${isExpanded ? 'max-height 1.5s ease-in' : 'max-height 0.5s ease-out'};
`;

export const HeadingStyled = css`
    position: relative;
`;

export const ButtonStyled: StyledFunction = (isExpanded, theme) => css`
    align-items: flex-start;
    border: 1px solid ${theme.greys['neutral-65']};
    border-bottom-color: ${isExpanded ? theme.greys['neutral-15'] : theme.greys['neutral-65']};
    border-radius: ${isExpanded ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
    color: ${theme.greys['neutral-100']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 1.5;
    min-height: var(--spacing-5x); /* TODO change colors when updating thematization */
    padding: var(--spacing-1x); /* TODO change colors when updating thematization */
    text-align: left;
    text-transform: none;
    width: 100%;
    &:hover, /* TODO change colors when updating thematization */
    &[aria-expanded='true'] {/* TODO change colors when updating thematization */
        background: ${theme.greys.white};
        color: ${theme.greys['neutral-100']};
    }
    &:focus { /* TODO change colors when updating thematization */
        border-bottom-color: ${isExpanded ? theme.greys['neutral-15'] : theme.greys['neutral-65']};
        box-shadow: ${theme.tokens['focus-box-shadow-inset']};
        color: ${theme.greys['neutral-100']};
    }
    > svg {
        height: 1rem;
        margin: 3px var(--spacing-1halfx) 0 3px; /* TODO change colors when updating thematization */
        width: 1rem;
    }
    &:disabled { /* TODO change colors when updating thematization */
        background-color: ${theme.greys['neutral-05']};
        border-color: ${theme.greys['neutral-15']};
        &:hover {
            color: ${theme.greys['neutral-30']};
        }
        > svg {
            color: ${theme.greys['neutral-30']};
        }
    }
`;
