import { CSSProperties, ReactNode } from 'react';
import { DeviceContextProps } from '../device-context-provider/device-context-provider';

export interface StyledModalProps extends Pick<DeviceContextProps, 'isMobile' | 'breakpoints'> {
    $width: CSSProperties['width'];
}

export type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>

export interface CommonStyledProps extends MobileDeviceContextProps {
    $noPadding: boolean;
}

export interface MainProps extends CommonStyledProps {
    $hasCloseButton: boolean;
    $hasHeader?: boolean;
    $hasFooter?: boolean;
}

export interface HeaderProps extends CommonStyledProps {
    $hasCloseButton: boolean;
    $isTopScrolled?: boolean;
}

export interface FooterProps extends CommonStyledProps {
    $isBottomScrolled?: boolean;
}

export interface BaseModalProps {
    /** Takes a query selector targeting the app Element. */
    appElement?: string;
    ariaDescribedby?: string;
    /** Boolean indicating if the appElement should be hidden. Defaults to true.
     * Should only be used for test purposes. */
    ariaHideApp?: boolean;
    children?: ReactNode;
    className?: string;
    /**
     * Modify the modal width
     * @default 60vw
     */
    width?: CSSProperties['width'];
    /**
     * Adds "x" iconButton to close modal
     * @default true
     */
    hasCloseButton?: boolean;
    isOpen: boolean;
    /**
     * Defines if the overlay click should close the modal
     * @default true
     */
    shouldCloseOnOverlayClick?: boolean;
    parentSelector?: () => HTMLElement;
    onRequestClose(): void;
    /** Function that will run after the modal has closed */
    onAfterClose?: () => void;
}

export interface ModalProps extends BaseModalProps {
    ariaLabel?: string;
    ariaLabelledBy?: string;
    /**
     * Removes padding to give you a blank modal to work with.
     * @default false
     */
    noPadding?: boolean;
    modalHeader?: ReactNode;
    modalFooter?: ReactNode;
    /**
     * Sets modal role tag
     * @default dialog
     */
    role?: string;
    /** Function that will run after the modal has opened */
    onAfterOpen?(): void;
    /** Function that will run after the modal has closed */
    onAfterClose?(): void;
}
