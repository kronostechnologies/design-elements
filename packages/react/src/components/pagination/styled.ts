import styled from 'styled-components';

export const Navigation = styled.nav<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    flex-shrink: 0;
    gap: 1.5rem;
    height: 1.5rem;
    justify-content: flex-end;
    padding: 0;
    width: 30rem;
`;

export const PaginationLinksWrapper = styled.ol`
    align-items: center;
    display: flex;
    gap: 0.5rem;
    padding: 0;
`;
