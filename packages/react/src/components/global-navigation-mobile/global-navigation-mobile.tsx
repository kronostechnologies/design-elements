import React, { ReactElement, ReactNode, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.greys.white};
  font-size: 1.125rem;
  height: 100vh;
  left: 0%;
  margin-top: 2.75rem;
  overflow-y: auto;
  padding: 0 30px;
  position: fixed;
  top: 0%;
  transform: translate(${(props: {open: boolean}) => props.open ? '0%' : '100%'});
  transition: all 300ms;
  width: 100%;
  z-index: 100;

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
}

export function GlobalNavigationMobile({ children }: GlobalNavMobileProps): ReactElement {
    const [{ open }, setOpen] = useState({ open: false });
    return (
        <>
            <Container open={open}>
                {children}
            </Container>
            <button onClick={() => setOpen({ open: !open })}>
                toggle menu
            </button>
        </>
    );
}
