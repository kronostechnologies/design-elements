import styled from 'styled-components';

export const Navigation = styled.nav<{ $isMobile: boolean }>`
    align-items: center;
    display: flex;
    flex-shrink: 0;
    gap: ${({ $isMobile }) => ($isMobile ? '2.25rem' : '1.5rem')};
    justify-content: flex-end;
    min-height: 1.75rem;
`;
