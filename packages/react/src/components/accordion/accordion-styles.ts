import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionSectionStyled = (isExpanded: boolean, theme: Theme) => css`
    background: ${theme.greys['colored-white']};
    border: ${isExpanded ? `1px solid ${theme.greys['dark-grey']}` : '0'};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    border-top-width: 0;
    color: ${theme.greys['neutral-100']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    height: ${isExpanded ? 'auto' : '0'};
    letter-spacing: 0.015rem;
    line-height: 1.7;
    margin-bottom: var(--spacing-1x);
    min-height: 0;
    overflow: hidden;
    padding: ${isExpanded ? 'var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x)' : '0'};
    transition: height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms;
` as any;

export const HeadingStyled = (isExpanded: boolean, theme: Theme) => css`
    border: 1px solid ${theme.greys['dark-grey']};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
    border-radius: ${isExpanded ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
    position: relative;
` as any;

export const ButtonStyled = (isExpanded: boolean, theme: Theme) => css`
    align-items: flex-start;
    border-radius: ${isExpanded ? 'var(--border-radius) var(--border-radius) 0 0' : 'var(--border-radius)'};
    color: ${theme.greys['neutral-100']};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 2;
    justify-content: start;
    padding: var(--spacing-1x) var(--spacing-1x) var(--spacing-1x) var(--spacing-4halfx); 
    text-align: left;
    text-transform: none;
    width: 100%;
    &:hover,
    &[aria-expanded='true'] {
        color: ${theme.greys['neutral-100']};
        background: ${theme.greys.white};
    }
    > svg {
        color: ${theme.greys['neutral-100']};
        left: var(--spacing-1x);
        padding: var(--spacing-half);
        position: absolute;
        top: var(--spacing-1halfx);
        width: 16px;
        height: 16px;
    }
` as any;
