import { FunctionComponent, PropsWithChildren, ReactNode, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { IconButton } from '../buttons/icon-button';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { focus } from '../../utils/css-state';

interface StyledModalProps extends Pick<DeviceContextProps, 'breakpoints' | 'isMobile'> {
    noPadding: boolean;
    hasCloseButton: boolean;
}

interface ContentProps extends Pick<DeviceContextProps, 'isMobile'> {
    noPadding: boolean;
    hasCloseButton: boolean;
}

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

const StyledModal = styled(ReactModal)<StyledModalProps>`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-radius: var(--border-radius-2x);
    box-shadow: 0 6px 10px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - var(--spacing-2x));
    max-width: 700px;
    min-width: ${getModalMinWidth};
    position: relative;
    width: ${({ isMobile }) => (isMobile ? 'calc(100vw - var(--spacing-2x))' : '60vw')};

    /* Firefox overflow-y: scroll problem fix (skipped bottom padding)
    https://bugzilla.mozilla.org/show_bug.cgi?id=748518 */

    &::after {
        content: '';
        display: block;
        padding-bottom: ${getPadding};
    }
    ${({ theme }) => focus({ theme }, { inverted: true })};
`;

const Main = styled.main<ContentProps>`
    max-height: 100%;
    overflow-y: auto;
    padding: ${getTopPadding} ${getPadding} 0;
`;

interface HeaderProps extends ContentProps {
    isTopScrolled?: boolean;
}
const Header = styled.header<HeaderProps>`
    /* TODO change colors when updating thematization */
    border-bottom: 1px solid ${({ isTopScrolled }) => (isTopScrolled ? '#878f9a' : 'transparent')};
    padding: ${getTopPadding} ${getPadding} var(--spacing-2x);

    & + ${Main} {
        padding-top: 0;
    }
`;

const CloseIconButton = styled(IconButton)<Pick<DeviceContextProps, 'isMobile'>>`
    position: absolute;
    right: ${({ isMobile }) => (isMobile ? 'var(--spacing-half)' : 'var(--spacing-4x)')};
    top: 1.75rem;
`;

interface FooterProps extends ContentProps {
    isBottomScrolled?: boolean;
}
const Footer = styled.footer<FooterProps>`
    /* TODO change colors when updating thematization */
    border-top: 1px solid ${({ isBottomScrolled }) => (isBottomScrolled ? '#878f9a' : 'transparent')};
    padding: var(--spacing-4x) ${getPadding} 0;
`;

export interface ModalProps {
    /** Takes a query selector targeting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    children?: ReactNode;
    className?: string;
    /**
     * Removes padding to give you a blank modal to work with.
     * @default false
     */
    noPadding?: boolean;
    /**
     * Adds "x" iconButton to close modal
     * @default true
     */
    hasCloseButton?: boolean;
    isOpen: boolean;
    modalFooter?: ReactNode;
    modalHeader?: ReactNode;
    parentSelector?: () => HTMLElement;
    /**
     * Sets modal role tag
     * @default dialog
     */
    role?: string;
    /**
     * Defines if the overlay click should close the modal
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;

    /** Function that will run after the modal has opened */
    onAfterOpen?(): void;

    /** Function that will run after the modal has closed */
    onAfterClose?(): void;

    onRequestClose(): void;
}

export const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({
    appElement,
    ariaDescribedby,
    ariaHideApp = true,
    ariaLabel,
    ariaLabelledBy,
    children,
    className,
    noPadding = false,
    hasCloseButton = true,
    isOpen,
    modalFooter,
    modalHeader,
    parentSelector,
    role = 'dialog',
    shouldCloseOnOverlayClick = true,
    onAfterOpen,
    onAfterClose,
    onRequestClose,
}) => {
    const [mainRef, setMainRef] = useState<HTMLUListElement>();
    const [topScroll, setTopScroll] = useState(0);
    const [bottomScroll, setBottomScroll] = useState(0);
    const { breakpoints, isMobile } = useDeviceContext();
    const mainRefCallback = useCallback((node: HTMLUListElement) => setMainRef(node), []);
    const { t } = useTranslation('modal');
    const theme = useTheme();
    const customStyles = {
        overlay: {
            alignItems: 'center',
            backgroundColor: theme.tokens['modal-overlay-background-color'],
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10000,
        },
    };

    const handleScroll = useCallback((): void => {
        if (mainRef) {
            const bottom = mainRef.scrollHeight - mainRef.clientHeight;

            setBottomScroll(bottom - mainRef.scrollTop);
            setTopScroll(mainRef.scrollTop);
        } else {
            setBottomScroll(0);
            setTopScroll(0);
        }
    }, [mainRef]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        handleScroll();
        mainRef?.addEventListener('scroll', handleScroll);

        return () => mainRef?.removeEventListener('scroll', handleScroll);
    }, [handleScroll, mainRef]);

    if (appElement) {
        ReactModal.setAppElement(appElement);
    }

    return (
        <StyledModal
            aria={{
                describedby: ariaDescribedby,
                labelledby: ariaLabelledBy,
                modal: true,
            }}
            ariaHideApp={ariaHideApp}
            className={className}
            noPadding={noPadding}
            hasCloseButton={hasCloseButton}
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onAfterClose={onAfterClose}
            onRequestClose={onRequestClose}
            parentSelector={parentSelector}
            role={role}
            style={customStyles}
            contentLabel={ariaLabel}
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            breakpoints={breakpoints}
            isMobile={isMobile}
        >
            {modalHeader && (
                <Header
                    hasCloseButton={hasCloseButton}
                    isMobile={isMobile}
                    isTopScrolled={topScroll > 0}
                    noPadding={noPadding}
                >
                    {modalHeader}
                </Header>
            )}

            {children && (
                <Main
                    hasCloseButton={hasCloseButton}
                    isMobile={isMobile}
                    noPadding={noPadding}
                    ref={mainRefCallback}
                >
                    {children}
                </Main>
            )}

            {modalFooter && (
                <Footer
                    hasCloseButton={hasCloseButton}
                    isBottomScrolled={bottomScroll > 0}
                    isMobile={isMobile}
                    noPadding={noPadding}
                >
                    {modalFooter}
                </Footer>
            )}

            {hasCloseButton && (
                <CloseIconButton
                    data-testid="close-button"
                    label={t('closeButtonLabel')}
                    type="button"
                    buttonType="tertiary"
                    iconName="x"
                    onClick={onRequestClose}
                    isMobile={isMobile}
                    size="small"
                />
            )}
        </StyledModal>
    );
};
