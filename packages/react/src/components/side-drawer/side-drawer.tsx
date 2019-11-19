import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

type origin = 'right' | 'left';

interface ContainerProps {
    open: boolean;
    origin: origin;
}

const Container = styled.div<ContainerProps>`
  background-color: ${props => props.theme.greys.white};
  font-size: 1.125rem;
  height: 100vh;
  left: 0%;
  margin-top: 56px;
  overflow-y: auto;
  padding: 0 24px;
  position: fixed;
  top: 0%;
  transform: translate(${props => props.open ? '0%' : props.origin === 'left' ? '-100%' : '100%'});
  transition: all 300ms;
  width: 100%;
  z-index: 100;

  > .side-drawer {
    margin-top: 0;
  }

  li {
    margin-left: 24px;
    padding: 12px 0;

    svg {
      margin-left: -24px;
    }

    .external {
      color: ${props => props.theme.greys['dark-grey']};

      &:hover {
        color: ${props => props.theme.greys.black};
        text-decoration: none;
      }

      &:visited {
        color: ${props => props.theme.greys['dark-grey']};

        &:hover {
          color: ${props => props.theme.greys.black};
        }
      }
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 24px 0;
  }
`;

interface SideDrawerProps {
    children?: ReactNode;
    open: boolean;
    /**
     * Drawer origin position
     * @default right
     **/
    drawerOrigin?: origin;
}

export function SideDrawer({ children, open, drawerOrigin }: SideDrawerProps): ReactElement {
    return (
        <>
            <Container
              className="side-drawer"
              open={open}
              origin={drawerOrigin ? drawerOrigin : 'right'}
            >
                {children}
            </Container>
        </>
    );
}
