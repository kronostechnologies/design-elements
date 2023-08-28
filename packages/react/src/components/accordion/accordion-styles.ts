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
    border: ${isExpanded ? `1px solid ${theme.greys['dark-grey']}` : '0'};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    border-top-width: 0;
    color: ${theme.greys['neutral-100']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    height: auto;
    letter-spacing: 0.015rem;
    line-height: 1.7;
    margin-bottom: var(--spacing-1x);
    max-height: ${isExpanded ? '500px' : '0'};
    overflow: hidden;
    padding: ${isExpanded ? 'var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x)' : '0 0 0 0'};
    transform: translateY(0);
    transition: max-height 180ms ease-in-out 0ms, padding 180ms ease-in-out 0ms, border 180ms ease-in-out 0ms;
`;

export const HeadingStyled = css`
    position: relative;
`;

export const ButtonStyled: StyledFunction = (isExpanded, theme) => css`
    align-items: flex-start;
    border: 1px solid ${theme.greys['dark-grey']};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
    border-radius: ${isExpanded ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
    color: ${theme.greys['neutral-100']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    justify-content: start;
    letter-spacing: 0.015rem;
    line-height: 2;
    padding: var(--spacing-1x) var(--spacing-1x) var(--spacing-1x) var(--spacing-4halfx);
    text-align: left;
    text-transform: none;
    width: 100%;
    &:hover,
    &[aria-expanded='true'] {
        background: ${theme.greys.white};
        color: ${theme.greys['neutral-100']};
    }
    &:focus {
        border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
        box-shadow: ${theme.tokens['focus-box-shadow-inset']};
    }
    > svg {
        color: ${theme.greys['neutral-100']};
        height: 16px;
        left: var(--spacing-1x);
        padding: var(--spacing-half);
        position: absolute;
        top: var(--spacing-1halfx);
        width: 16px;
    }
    &:disabled {
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
