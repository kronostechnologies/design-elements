import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const StyledAccordionGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionSectionStyled = (isExpanded: boolean, theme: Theme) => css`
   
    border: ${isExpanded ? `1px solid ${theme.greys['dark-grey']}` : '0'};
    border-top-width: 0;
    margin-bottom: 8px;
    border-radius: 0 0 4px 4px;
    background: ${theme.greys['colored-white']};
    
    color: #1B1C1E;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.24px;
   
    padding: ${isExpanded ? '16px 24px 24px 40px' : '0'};
    min-height: 0;
    overflow: hidden;
    height: ${isExpanded ? 'auto' : '0'}; 
    transition: height 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms; 
`;

export const HeadingStyled = (isExpanded: boolean, theme: Theme) => css`
    border: 1px solid ${theme.greys['dark-grey']};
    border-bottom-color: ${isExpanded ? theme.greys.grey : theme.greys['dark-grey']};
    border-radius: ${isExpanded ? '4px 4px 0px 0px' : '4px'};
`;

export const ButtonStyled = (isExpanded: boolean, theme: Theme) => css`
    text-transform: none;
    font-size: .875rem;
    line-height: 24px;
    font-weight: 400;
    letter-spacing: 0.24px;
    width: 100%;
    border-radius: ${isExpanded ? '4px 4px 0px 0px' : '4px'};
    padding: 8px;
    justify-content: start;
    &[aria-expanded="true"]{
        background: ${theme.greys.white};
    }

    > svg {
        color: ${theme.greys['dark-grey']};
        padding: 4px;
        margin-right: 4px;
    }
`;