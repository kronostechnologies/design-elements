import styled from 'styled-components';

export const InvertedBackground = styled.div`
    background-color: ${({ theme }) => theme.notifications['error-2.1']};
    border-radius: var(--border-radius);
    padding: var(--spacing-1x);
`;
