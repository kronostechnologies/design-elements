import { FunctionComponent, PropsWithChildren, VoidFunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { useToasts } from '../../hooks/use-toasts';
import { ResolvedTheme } from '../../themes/theme';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { ToastContainer } from './toast-container';
import { ToastPosition } from './toast-position';

interface ToastProps {
    position: ToastPosition;
}

type MobileDeviceContextProps = Pick<DeviceContextProps, 'isMobile'>;
type ContainerProps = ToastProps & MobileDeviceContextProps;

function getToastPosition({
    isMobile,
    position,
}: ContainerProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    const lateralPosition = isMobile ? '0' : 'var(--spacing-2x)';
    switch (position) {
        case 'top-right':
            return css`
                right: ${lateralPosition};
                top: var(--spacing-2x);
            `;
        case 'bottom-right':
            return css`
                bottom: var(--spacing-2x);
                right: ${lateralPosition};
            `;
        case 'top-left':
            return css`
                left: ${lateralPosition};
                top: var(--spacing-2x);
            `;
        case 'bottom-left':
            return css`
                bottom: var(--spacing-2x);
                left: ${lateralPosition};
            `;
    }
}

const Toast = styled(ToastContainer)`
    & + & {
        margin-top: var(--spacing-half);
    }
`;

const ToastListWrapper = styled.div<ContainerProps>`
    box-sizing: border-box;
    position: fixed;
    z-index: 100000;

    ${getToastPosition}
`;

function getRootElement(shadowRoot: ShadowRoot | null): Element {
    if (shadowRoot) {
        return shadowRoot.getRootNode() as unknown as Element;
    }

    return document.body;
}

interface PortalProps {
    shadowRoot: ShadowRoot | null;
}

const Portal: FunctionComponent<PropsWithChildren<PortalProps>> = ({ children, shadowRoot }) => {
    const rootDocument = getRootElement(shadowRoot);
    return ReactDOM.createPortal(children, rootDocument);
};

export const ToastsContainer: VoidFunctionComponent<ToastProps> = ({
    position,
}) => {
    const { toasts } = useToasts();
    const { isMobile } = useDeviceContext();
    const shadowRoot = useShadowRoot();

    return (
        <Portal shadowRoot={shadowRoot}>
            <ToastListWrapper position={position} isMobile={isMobile} data-testid="toasts">
                {
                    toasts.map(({ id, type, message }, i) => (
                        <Toast
                            key={id}
                            id={id}
                            type={type}
                            message={message}
                            position={position}
                            data-testid={`toast-${i}`}
                        />
                    ))
                }
            </ToastListWrapper>
        </Portal>
    );
};

ToastsContainer.displayName = 'ToastsContainer';
