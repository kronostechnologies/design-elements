import { CSSProperties } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { ContentProps, FooterProps, HeaderProps, StyledModalProps } from './types';

function getModalMinWidth({ breakpoints, isMobile }: StyledModalProps): string {
    return isMobile ? 'initial' : `calc(${breakpoints.mobile}px - var(--spacing-4x))`;
}

function getModalWidth({ $width, isMobile }: StyledModalProps): CSSProperties['width'] {
    return isMobile ? 'calc(100vw - var(--spacing-2x))' : $width;
}

function getWidthPadding({ $noPadding, isMobile }: ContentProps): string {
    if ($noPadding) {
        return '0';
    }
    if (isMobile) {
        return 'var(--spacing-2x)';
    }
    return 'var(--spacing-4x)';
}

function getHeightPadding({ $noPadding, isMobile }: ContentProps): string {
    if ($noPadding) {
        return '0';
    }
    if (isMobile) {
        return 'var(--spacing-2x)';
    }
    return 'var(--spacing-3x)';
}

export const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.component['modal-background-color']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 6px 10px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: calc(100vh - var(--spacing-2x));
    max-width: 95vw;
    min-height: 1vh;
    min-width: ${getModalMinWidth};
    position: relative;
    width: ${getModalWidth};

    /* Firefox overflow-y: scroll problem fix (skipped bottom padding)
    https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */

    &::after {
        content: '';
        display: block;
    }
`;

export const Main = styled.main<ContentProps>`
    max-height: 100%;
    overflow-y: auto;
    padding: ${getHeightPadding} ${getWidthPadding};
    ${({ $hasHeader }) => $hasHeader && 'padding-top: 0'};
    ${({ $hasFooter }) => $hasFooter && 'padding-bottom: 0'};
`;

export const Header = styled.header<HeaderProps>`
    border-bottom: 1px solid ${({ $isTopScrolled, theme }) => ($isTopScrolled ? theme.component['modal-border-color'] : 'transparent')};
    padding: ${getHeightPadding} ${getWidthPadding};

    ${({ $hasCloseButton }) => $hasCloseButton && `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `};
`;

export const Footer = styled.footer<FooterProps>`
    border-top: 1px solid ${({ $isBottomScrolled, theme }) => ($isBottomScrolled ? theme.component['modal-border-color'] : 'transparent')};
    padding: var(--spacing-4x) ${getWidthPadding};
`;

export const StyledCloseButton = styled(IconButton)<ContentProps>`
    ${({ $hasHeader }) => !$hasHeader && `
        pointer-events: none;
        position: absolute;

        & > * {
            pointer-events: auto;
        }
    `};
    right: ${({ $hasHeader }) => !$hasHeader && getWidthPadding};
    top: ${({ $hasHeader }) => !$hasHeader && getHeightPadding};
`;
