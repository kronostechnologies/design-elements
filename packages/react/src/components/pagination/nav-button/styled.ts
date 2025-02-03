import styled from 'styled-components';
import { IconButton } from '../../buttons';

export const StyledIconButton = styled(IconButton)<{ isVisible: boolean }>`
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;
