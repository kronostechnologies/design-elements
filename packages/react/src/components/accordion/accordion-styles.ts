import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const AccordionSectionStyled = (isExpanded: boolean, theme: Theme) => css`
    background: ${theme.greys['colored-white']};
    border: ${isExpanded ? `1px solid ${theme.greys['dark-grey']}` : '0'};
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    border-top-width: 0;
    color: ${theme.greys['neutral-100']};
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    line-height: 1.7;
    margin-bottom: var(--spacing-1x);
    height: auto;
    max-height: ${isExpanded ? '500px' : '0'};
    
    overflow: hidden;
    padding: ${isExpanded ? 'var(--spacing-2x) var(--spacing-3x) var(--spacing-3x) var(--spacing-5x)' : '0 0 0 0'};

    transform: translateY(0);
    transition: max-height 180ms ease-in-out 0ms, padding 180ms ease-in-out 0ms, border 180ms ease-in-out 0ms; 

` as any;

export const HeadingStyled = () => css`
    position: relative;
` as any;

export const ButtonStyled = (isExpanded: boolean, theme: Theme) => css`
    align-items: flex-start;
    border: 1px solid ${theme.greys['dark-grey']};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
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
    &:focus {
        border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
        box-shadow: ${theme.tokens['focus-box-shadow-inset']};
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

    &:disabled {
        background-color: ${theme.greys['neutral-05']};
        border-color:${theme.greys['neutral-15']};
        &:hover {
            color: ${theme.greys['neutral-30']};
        }
        > svg {
            color: ${theme.greys['neutral-30']};
        }
    }
` as any;
