import React, { ReactElement, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type Origin = 'right' | 'left';

interface ContainerProps {
    open: boolean;
    origin?: Origin;
}

const Container = styled.div<ContainerProps>`
  background-color: ${props => props.theme.greys.white};
  height: calc(100vh - 56px);
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 56px;
  transform: translate(${props => props.open ? '0%' : props.origin === 'left' ? '-100%' : '100%'});
  transition: all 300ms;
  width: 100%;
  z-index: 100;

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
    drawerOrigin?: Origin;
    /** Use on nested drawers to prevent background scroll */
    nested?: boolean;
    open: boolean;
}

export function SideDrawer({ children, nested, open, drawerOrigin }: SideDrawerProps): ReactElement {
    useEffect(() => {
        if (open) document.body.style.overflow = `hidden`;

        return () => {
            if (!nested) document.body.style.overflow = `unset`;
        };
    }, [open]);

    return (
        <Container
          className="side-drawer"
          open={open}
          origin={drawerOrigin}
        >
            {children}
        </Container>
    );
}

SideDrawer.defaultProps = {
    drawerOrigin: 'right',
};
