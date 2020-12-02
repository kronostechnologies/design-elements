import { useDeviceContext } from '@design-elements/components/device-context-provider/device-context-provider';
import { getInitialsFromUsername } from '@design-elements/utils/user';

import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';

interface AvatarProps {
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
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.625rem')};
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.23px' : '0.17px')};
`;

export function Avatar({ username }: AvatarProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const initials = useMemo(() => getInitialsFromUsername(username), [username]);

    return (
        <StyledDiv role="img" aria-label={username.concat(' avatar')} isMobile={isMobile}>
            <StyledSpan data-testid="avatar-initials" isMobile={isMobile}>
                {initials.length <= 2 && initials}
            </StyledSpan>
        </StyledDiv>
    );
}
