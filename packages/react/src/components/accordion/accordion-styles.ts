import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionSectionStyled = (isExpanded: boolean, theme: Theme) => css`
    background: ${theme.greys['colored-white']};
    border: ${isExpanded ? `1px solid ${theme.greys['dark-grey']}` : '0'};
    border-radius: 0 0 4px 4px;
    border-top-width: 0;
    color: #1b1c1e;
    font-size: 0.75rem;
    font-weight: 400;
    height: ${isExpanded ? 'auto' : '0'};
    letter-spacing: 0.24px;
    line-height: 1.7;
    margin-bottom: 8px;
    min-height: 0;
    overflow: hidden;
    padding: ${isExpanded ? '16px 24px 24px 40px' : '0'};
    transition: height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms;
`;

export const HeadingStyled = (isExpanded: boolean, theme: Theme) => css`
    border: 1px solid ${theme.greys['dark-grey']};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
    border-radius: ${isExpanded ? '4px 4px 0px 0px' : '4px'};
`;

export const ButtonStyled = (isExpanded: boolean, theme: Theme) => css`
    border-radius: ${ isExpanded ? '4px 4px 0px 0px' : '4px' };
    font-size: 0.875rem;
    font-weight: 400;
    justify-content: start;
    letter-spacing: 0.24px;
    line-height: 24px;
    padding: 8px;
    text-transform: none;
    width: 100%;
    &[aria-expanded='true'] {
        background: ${theme.greys.white};
    }
    > svg {
        color: ${theme.greys['dark-grey']};
        margin-right: 4px;
        padding: 4px;
    }
`;