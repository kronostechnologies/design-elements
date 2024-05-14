import styled from 'styled-components';

export const InvertedBackground = styled.div`
    background-color: ${({ theme }) => theme.ref['color-neutral-15']};
    border-radius: var(--border-radius);
    padding: var(--spacing-1x);
`;
