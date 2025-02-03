import styled from 'styled-components';

export const Navigation = styled.nav<{ isMobile: boolean }>`
    display: flex;
    width: 30rem;
    height: 1.5rem;
    padding: 0;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 0;
`;

export const PaginationLinksWrapper = styled.ol`
    display: flex;
    padding: 0;
    align-items: center;
    gap: 0.5rem;
`;
