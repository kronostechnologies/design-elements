import { CSSProperties } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { DeviceContextProps } from '../device-context-provider/device-context-provider';
import { ContentProps, FooterProps, HeaderProps, StyledModalProps } from './types';

function getPadding({ noPadding, isMobile }: ContentProps): string {
    if (noPadding) {
        return '0';
    }
    if (isMobile) {
        return 'var(--spacing-2x)';
    }
    return 'var(--spacing-4x)';
}

function getTopPadding({ hasCloseButton, noPadding, isMobile }: ContentProps): string {
    if (noPadding) {
        return '0';
    }
    if (isMobile) {
        if (hasCloseButton) {
            return 'var(--spacing-2x)';
        }
    }
    return 'var(--spacing-3x)';
}

function getModalMinWidth({ breakpoints, isMobile }: StyledModalProps): string {
    return isMobile ? 'initial' : `calc(${breakpoints.mobile}px - var(--spacing-4x))`;
}

function getModalWidth({ width, isMobile }: StyledModalProps): CSSProperties['width'] {
    return isMobile ? 'calc(100vw - var(--spacing-2x))' : width;
}

export const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.component['modal-background-color']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 6px 10px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - var(--spacing-2x));
    max-width: 95vw;
    min-width: ${getModalMinWidth};
    position: relative;
    width: ${getModalWidth};

    /* Firefox overflow-y: scroll problem fix (skipped bottom padding)
    https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */

    &::after {
        content: '';
        display: block;
        padding-bottom: ${getPadding};
    }
`;

export const Main = styled.main<ContentProps>`
    max-height: 100%;
    overflow-y: auto;
    padding: ${getTopPadding} ${getPadding} 0;
`;

export const Header = styled.header<HeaderProps>`
    border-bottom: 1px solid ${({ isTopScrolled, theme }) => (isTopScrolled ? theme.component['modal-border-color'] : 'transparent')};
    padding: ${getTopPadding} ${getPadding} var(--spacing-2x);

    & + ${Main} {
        padding-top: 0;
    }
`;

export const Footer = styled.footer<FooterProps>`
    border-top: 1px solid ${({ isBottomScrolled, theme }) => (isBottomScrolled ? theme.component['modal-border-color'] : 'transparent')};
    padding: var(--spacing-4x) ${getPadding} 0;
`;

export const CloseIconButton = styled(IconButton)<Pick<DeviceContextProps, 'isMobile'>>`
    position: absolute;
    right: ${({ isMobile }) => (isMobile ? 'var(--spacing-half)' : 'var(--spacing-4x)')};
    top: 1.75rem;
`;
