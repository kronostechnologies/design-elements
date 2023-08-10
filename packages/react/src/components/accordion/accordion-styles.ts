import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionSectionStyled = (isExpanded: boolean, theme: Theme) => css`
    min-height: 0;
    overflow: hidden;
    height: ${isExpanded ? 'auto' : '0'}; 
    border: ${isExpanded ? `1px solid ${theme.greys.black}` : '0'};
    border-top-width: 0;
    margin-bottom: 8px;
    border-radius: 0 0 4px 4px;
    padding: ${isExpanded ? '16px 24px 24px 40px' : '0'};
    background: ${theme.greys['colored-white']};
    transition: height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms; 
    font-size: 0.75rem;
    line-height: 1.5;
    letter-spacing: 0.24px;
    font-weight: 400;
`;

export const HeadingStyled = (isExpanded: boolean, theme: Theme) => css`
    border: 1px solid ${theme.greys.black};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys.black};
    border-radius: ${isExpanded ? '4px 4px 0px 0px' : '4px'};
`;

export const ButtonStyled = (isExpanded: boolean, theme: Theme) => css`
    width: 100%;
    border-radius: ${isExpanded ? '4px 4px 0px 0px' : '4px'};
    padding: 8px 24px 8px 8px;
    justify-content: start;
    &[aria-expanded="true"]{
        background: ${theme.greys.white};
    }
    > svg {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }
`;