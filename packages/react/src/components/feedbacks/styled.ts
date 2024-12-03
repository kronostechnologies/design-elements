import styled from 'styled-components';
import { Icon } from '../icon/icon';

export const StyledValidationMessage = styled.span<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-error-text-color']};
    display: flex;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

export const StyledIcon = styled(Icon)`
    align-self: center;
    display: flex;
    margin-right: var(--spacing-base);
`;
