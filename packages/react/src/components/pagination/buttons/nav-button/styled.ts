import styled from 'styled-components';
import { IconButton } from '../../../buttons';

export const StyledIconButton = styled(IconButton)<{ $isVisible: boolean, $isMobile: boolean }>`
    align-items: center;
    display: flex;
    gap: 0.5rem;
    min-height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    min-width: ${({ $isMobile }) => ($isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
    visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
    width: auto;
`;
