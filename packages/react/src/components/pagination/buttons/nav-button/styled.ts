import styled from 'styled-components';
import { IconButton } from '../../../buttons';

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

export const StyledIconButton = styled(IconButton)<{ $isMobile: boolean }>`
    min-height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    min-width: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    width: auto;
`;
