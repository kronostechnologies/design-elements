import styled from 'styled-components';

export const ResultsLabel = styled.span<{ isMobile: boolean }>`
    font-size: ${(props) => (props.isMobile ? 1 : 0.9)}rem;
    font-weight: var(--font-normal);
    line-height: ${(props) => (props.isMobile ? 2 : 1.5)}rem;
    margin-bottom: ${(props) => (props.isMobile ? 'var(--spacing-1halfx)' : 0)};
    margin-right: ${(props) => (props.isMobile ? 0 : 'var(--spacing-3x)')};
    white-space: nowrap;
`;

export const CurrentPageLabelHeading = styled.h3`
    font-size: 0.875rem;
    line-height: 1.5rem;
`;
