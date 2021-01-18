import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { getInitialsFromUsername } from '../../utils/user';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface AvatarProps {
    className?: string;
    username: string;
}

const StyledDiv = styled.div<{isMobile: boolean}>`
    align-items: center;
    background: ${({ theme }) => theme.greys['colored-white']};
    border-radius: 50%;
    display: flex;
    height: ${({ isMobile }) => (isMobile ? '2.5rem' : '1.5rem')};
    justify-content: center;
    width: ${({ isMobile }) => (isMobile ? '2.5rem' : '1.5rem')};
`;

const StyledSpan = styled.span<{isMobile: boolean}>`
    /* TODO change colors when updating thematization */
    color: #60666e;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.625rem')};
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.23px' : '0.17px')};
`;

export function Avatar({ className, username }: AvatarProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const initials = useMemo(() => getInitialsFromUsername(username), [username]);

    return (
        <StyledDiv className={className} role="img" aria-label={username.concat(' avatar')} isMobile={isMobile}>
            <StyledSpan data-testid="avatar-initials" isMobile={isMobile}>
                {initials.length <= 2 && initials}
            </StyledSpan>
        </StyledDiv>
    );
}
