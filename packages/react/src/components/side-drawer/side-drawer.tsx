import React, { ReactElement, ReactNode,  useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../tokens/breakpoints';

type Origin = 'right' | 'left';

interface ContainerProps {
    open: boolean;
    origin?: Origin;
    width: string;
}

const Container = styled.div<ContainerProps>`
    background-color: ${props => props.theme.greys.white};
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    height: calc(100vh - 48px);
    ${props => props.origin}: 0;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 48px;
    transform: translate(${props => props.open ? '0%' : props.origin === 'left' ? '-100%' : '100%'});
    transition: transform 300ms;
    width: ${props => props.width};
    z-index: 100;

    @media screen and (max-width: ${breakpoints.desktop}px) {
        height: calc(100vh - 56px);
        top: 56px;
    }

    > .side-drawer {
        height: 100%;
        top: 0;
    }
`;

interface SideDrawerProps {
    children: ReactNode;
    /**
     * Drawer origin position
     * @default right
     **/
    drawerOrigin: Origin;
    id?: string;
    /** Use on nested drawers to prevent background scroll */
    nested?: boolean;
    open: boolean;
    /**
     * Sets drawer width
     * @default 100%
     **/
    width: string;
}

export function SideDrawer({ children, id, nested, open, drawerOrigin, width }: SideDrawerProps): ReactElement {
    const [drawerOpen, setDrawerOpen] = useState(open);
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const drawer = drawerRef.current;

        // Prevents background scroll on full screen drawers
        if (open && width === '100%' || width === '100vw') document.body.style.overflow = `hidden`;

        if (drawer === null) return;

        // Sets display block / none before and after animations for accessibility
        if (open) {
            drawer.style.display = 'block';
            setTimeout(() => setDrawerOpen(true), 30);
        } else if (!open) {
            setDrawerOpen(false);
            setTimeout(() => {
                if (drawer.scrollTop > 0) drawer.scrollTop = 0;
                drawer.style.display = 'none';
            }, 300);
        }

        return () => {
            if (!nested) document.body.style.overflow = `unset`;
        };
    }, [open]);

    return (
        <Container
          aria-hidden={!drawerOpen}
          className="side-drawer"
          id={id}
          open={drawerOpen}
          origin={drawerOrigin}
          ref={drawerRef}
          width={width}
        >
            {children}
        </Container>
    );
}

SideDrawer.defaultProps = {
    drawerOrigin: 'right',
    width: '100%',
};
