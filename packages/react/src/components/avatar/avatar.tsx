import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { getInitialsFromUsername } from '../../utils/user';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface AvatarProps {
    className?: string;
    username: string;
    size?: AvatarSize;
}

export enum AvatarSize {
    XSmall,
    Small,
    Medium,
    Large
}

const StyledDiv = styled.div`
    align-items: center;
    background: ${({ theme }) => theme.greys['colored-white']};
    border-radius: 50%;
    display: flex;
    justify-content: center;
`;

const StyledSpan = styled.span`
    color: ${({ theme }) => theme.greys['dark-grey']};
`;

const XSmallAvatarContainer = styled(StyledDiv)<{isMobile: boolean}>`
    height: ${({ isMobile }) => (isMobile ? '2rem' : '1.5rem')};
    width: ${({ isMobile }) => (isMobile ? '2rem' : '1.5rem')};
`;

const SmallAvatarContainer = styled(StyledDiv)<{isMobile: boolean}>`
    height: ${({ isMobile }) => (isMobile ? '2.5rem' : '2rem')};
    width: ${({ isMobile }) => (isMobile ? '2.5rem' : '2rem')};
`;

const MediumAvatarContainer = styled(StyledDiv)<{isMobile: boolean}>`
    height: ${({ isMobile }) => (isMobile ? '3rem' : '3rem')};
    width: ${({ isMobile }) => (isMobile ? '3rem' : '3rem')};
`;

const LargeAvatarContainer = styled(StyledDiv)<{isMobile: boolean}>`
    height: ${({ isMobile }) => (isMobile ? '4.5rem' : '5rem')};
    width: ${({ isMobile }) => (isMobile ? '4.5rem' : '5rem')};
`;

const XSmallAvatarSpan = styled(StyledSpan)<{isMobile: boolean}>`
    font-size: ${({ isMobile }) => (isMobile ? '0.75rem' : '0.625rem')};
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.2px' : '0.17px')};
`;

const SmallAvatarSpan = styled(StyledSpan)<{isMobile: boolean}>`
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.23px' : '0.2px')};
`;

const MediumAvatarSpan = styled(StyledSpan)<{isMobile: boolean}>`
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '1rem')};
`;

const LargeAvatarSpan = styled(StyledSpan)<{isMobile: boolean}>`
    font-size: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.5rem')};
`;

export function Avatar({ className, username, size = AvatarSize.XSmall }: AvatarProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const initials = useMemo(() => getInitialsFromUsername(username), [username]);
    const ariaLabel = useMemo(() => username.concat(' avatar'), [username]);

    return (
        <div>
            {(() => {
                switch (size) {
                    case AvatarSize.XSmall:
                        return <XSmallAvatarContainer role="img" aria-label={ariaLabel} className={className} isMobile={isMobile}>
                            <XSmallAvatarSpan data-testid="avatar-initials" isMobile={isMobile}>
                                {initials.length <= 2 && initials}
                            </XSmallAvatarSpan>
                        </XSmallAvatarContainer>;
                    case AvatarSize.Small:
                        return <SmallAvatarContainer role="img" aria-label={ariaLabel} className={className} isMobile={isMobile}>
                            <SmallAvatarSpan data-testid="avatar-initials" isMobile={isMobile}>
                                {initials.length <= 2 && initials}
                            </SmallAvatarSpan>
                        </SmallAvatarContainer>;
                    case AvatarSize.Medium:
                        return <MediumAvatarContainer role="img" aria-label={ariaLabel} className={className} isMobile={isMobile}>
                            <MediumAvatarSpan data-testid="avatar-initials" isMobile={isMobile}>
                                {initials.length <= 2 && initials}
                            </MediumAvatarSpan>
                        </MediumAvatarContainer>;
                    case AvatarSize.Large:
                        return <LargeAvatarContainer role="img" aria-label={ariaLabel} className={className} isMobile={isMobile}>
                            <LargeAvatarSpan data-testid="avatar-initials" isMobile={isMobile}>
                                {initials.length <= 2 && initials}
                            </LargeAvatarSpan>
                        </LargeAvatarContainer>;
                }
            })()}
        </div>
    );
}
