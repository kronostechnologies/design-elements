import styled from 'styled-components';
import { Button } from '../../buttons/button';
import { Icon } from '../../icon/icon';
import { MobileDeviceContextProps } from '../types';

export const Subtitle = styled.h3<MobileDeviceContextProps>`
    font-size: ${({ isMobile }) => (isMobile ? 1.125 : 1)}rem;
    font-weight: var(--font-normal);
    line-height: ${({ isMobile }) => (isMobile ? 1.75 : 1.375)}rem;
    margin: var(--spacing-3x) 0 0;
`;

export const ButtonContainer = styled.div<MobileDeviceContextProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'unset')};
    justify-content: end;
`;

export const ConfirmButton = styled(Button)<MobileDeviceContextProps>`
    margin-left: ${({ isMobile }) => (isMobile ? 0 : 'var(--spacing-1x)')};
    margin-top: ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 0)};
`;

export const CancelButton = styled(Button)`
`;

const HeadingWrapper = styled.div`
    position: relative;
`;

export const TitleIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

export const StyledHeadingWrapperComponent = styled(HeadingWrapper)`
    align-items: center;
    display: flex;
`;
