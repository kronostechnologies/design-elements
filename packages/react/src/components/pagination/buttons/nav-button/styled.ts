import styled from 'styled-components';

export const StyledWrapper = styled.div<{ $isVisible: boolean }>`
    align-items: center;
    display: flex;
    gap: 0.5rem;
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

export const StyledButtonContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;
