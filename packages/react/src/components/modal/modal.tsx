import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useTheme } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import {
    CloseIconButton,
    Footer,
    Header,
    Main,
    StyledModal,
} from './styled';
import { ModalProps } from './types';

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
            backgroundColor: theme.component['modal-backdrop-background-color'],
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
