import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../tokens/breakpoints';

const tabletMin = `${(breakpoints.tablet / 16)}rem`;

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
  transform: translate(${props => props.open ? '0%' : props.origin === 'left' ? '-110%' : '110%'});
  transition: transform 300ms;
  width: ${props => props.width};
  z-index: 100;

  @media screen and (min-width: ${tabletMin}) {
    height: calc(100vh - 80px);
    top: 80px;
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
    /** Use on nested drawers to prevent background scroll */
    nested?: boolean;
    open: boolean;
    /**
     * Sets drawer width
     * @default 100%
     **/
    width: string;
}

export function SideDrawer({ children, nested, open, drawerOrigin, width }: SideDrawerProps): ReactElement {
    const drawerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (open && width === '100%' || width === '100vw') document.body.style.overflow = `hidden`;
        else if (!open && drawerRef.current && drawerRef.current.scrollTop > 0) {
            setTimeout(() => {
                if (drawerRef.current) drawerRef.current.scrollTop = 0;
            }, 300);
        }

        return () => {
            if (!nested) document.body.style.overflow = `unset`;
        };
    }, [open]);

    return (
        <Container
          className="side-drawer"
          open={open}
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
