import styled from 'styled-components';

export const Navigation = styled.nav<{ $isMobile: boolean }>`
    align-items: center;
    display: flex;
    flex-shrink: 0;
    gap: ${({ $isMobile }) => ($isMobile ? '2.25rem' : '1.5rem')};
    justify-content: flex-end;
`;

export const PaginationButtonsWrapper = styled.div<{ $isMobile: boolean }>`
    align-items: center;
    display: flex;
    gap: ${({ $isMobile }) => ($isMobile ? '0.75rem' : '0.5rem')};
    padding: 0;
`;

export const PaginationPageButtonsWrapper = styled.ol<{ $isMobile: boolean }>`
    align-items: center;
    display: flex;
    gap: ${({ $isMobile }) => ($isMobile ? '0.75rem' : '0.5rem')};
    margin: 0;
    padding: 0;
`;
