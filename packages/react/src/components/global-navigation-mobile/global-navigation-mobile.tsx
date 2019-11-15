import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

type origin = 'right' | 'left';

const Container = styled.div`
  background-color: ${props => props.theme.greys.white};
  font-size: 1.125rem;
  height: 100vh;
  left: 0%;
  margin-top: 48px;
  overflow-y: auto;
  padding: 0 24px;
  position: fixed;
  top: 0%;
  transform: translate(${(props: {open: boolean, origin: origin}) => props.open ? '0%' : props.origin === 'left' ? '-100%' : '100%'});
  transition: all 300ms;
  width: 100%;
  z-index: 100;

  > .side-panel {
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

interface GlobalNavMobileProps {
    children?: ReactNode;
    open: boolean;
    /**
     * Menu origin position
     * @default right
     **/
    menuOrigin?: origin;
}

export function GlobalNavigationMobile({ children, open, menuOrigin }: GlobalNavMobileProps): ReactElement {
    return (
        <>
            <Container
              className="side-panel"
              open={open}
              origin={menuOrigin ? menuOrigin : 'right'}
            >
                {children}
            </Container>
        </>
    );
}
