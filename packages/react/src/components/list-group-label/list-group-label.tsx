import { ReactElement } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';

const GroupLabel = styled.li<{
    theme: Theme,
    isMobile: boolean
}>`
    color: ${({ theme }) => theme.greys['mid-grey']};
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    padding: 0 var(--spacing-2x);
`;

export const ListGroupLabel = ({ label, isMobile }: { label: string, isMobile: boolean }): ReactElement => (
    <GroupLabel
        id={label}
        isMobile={isMobile}
        role="presentation"
    >
        {label}
    </GroupLabel>
);
