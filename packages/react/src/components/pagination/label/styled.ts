import styled from 'styled-components';
import { Heading } from '../../heading/heading';

export const ResultsLabelHeading = styled(Heading)<{ $isMobile: boolean }>`
    font-size: ${({ $isMobile }) => ($isMobile ? 1 : 0.875)}rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.0125rem;
    line-height: ${({ $isMobile }) => ($isMobile ? 1.5 : 1.25)}rem;
    margin: 0;
`;
