import { FunctionComponent, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider';

type Origin = 'right' | 'left';

interface ContainerProps {
    open: boolean;
    origin?: Origin;
    width: string;
    isDesktop: boolean;
}

function getTranslate({ open, origin }: ContainerProps): string {
    if (open) {
        return '0%';
    }
    if (origin === 'left') {
        return '-100%';
    }
    return '100%';
}

const Container = styled.div<ContainerProps>`
    background-color: ${(props) => props.theme.component['side-drawer-background-color']};
    box-shadow: 0 6px 10px 0 ${(props) => props.theme.component['side-drawer-box-shadow-color']};
    height: calc(100vh - ${({ isDesktop }) => (isDesktop ? 48 : 56)}px);
    ${({ origin }) => `${origin}: 0`};
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: ${({ isDesktop }) => (isDesktop ? 48 : 56)}px;
    transform: translate(${getTranslate});
    transition: transform 300ms;
    width: ${(props) => props.width};
    z-index: 100;

    & > & {
        height: 100%;
        top: 0;
    }
`;

export interface SideDrawerProps {
    children: ReactNode;
    className?: string;
    /**
     * Drawer origin position
     * @default right
     */
    drawerOrigin?: Origin;
    id?: string;
    /** Use on nested drawers to prevent background scroll */
    nested?: boolean;
    open: boolean;
    /**
     * Sets drawer width
     * @default 100%
     */
    width?: string;
}

export const SideDrawer: FunctionComponent<PropsWithChildren<SideDrawerProps>> = ({
    children,
    className,
    drawerOrigin = 'right',
    id,
    nested,
    open,
    width = '100%',
}) => {
    const { isDesktop } = useDeviceContext();
    const [drawerOpen, setDrawerOpen] = useState(open);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const drawer = drawerRef.current;

        // Prevents background scroll on full screen drawers
        if (open && (width === '100%' || width === '100vw')) {
            document.body.style.overflow = 'hidden';
        }

        if (drawer === null) {
            return;
        }

        // Sets display block / none before and after animations for accessibility
        if (open) {
            drawer.style.display = 'block';
            setTimeout(() => setDrawerOpen(true), 30);
        } else if (!open) {
            setDrawerOpen(false);
            setTimeout(() => {
                if (drawer.scrollTop > 0) {
                    drawer.scrollTop = 0;
                }
                drawer.style.display = 'none';
            }, 300);
        }

        return () => {
            if (!nested) {
                document.body.style.overflow = 'unset';
            }
        };
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container
            aria-hidden={!drawerOpen}
            className={className}
            isDesktop={isDesktop}
            id={id}
            open={drawerOpen}
            origin={drawerOrigin}
            ref={drawerRef}
            width={width}
        >
            {children}
        </Container>
    );
};

SideDrawer.displayName = 'SideDrawer';
