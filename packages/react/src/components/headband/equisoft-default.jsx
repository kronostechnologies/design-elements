import React, { Component } from 'react';
import styled from 'styled-components';

import MediaView from '../media-view';
import breakpoints from '../tokens/breakpoints';

import EquisoftIco from '../../logos/logo-equisoft-ico.svg';
import EquisoftLogo from '../../logos/logo-equisoft-reversed.svg';

const tabletMin = (breakpoints['tablet'] / 16) + 'rem';

const Header = styled.header`
  align-items: center;
  background: rgba(1, 38, 57, 1);
  box-sizing: border-box;
  color: rgba(255, 255, 255);
  display: flex;
  justify-content: space-between;
  min-height: 2.75rem;
  padding: 0.75rem 1rem;

  @media screen and (min-width: ${tabletMin}) {
    min-height: 5rem;
    padding: 1.25rem 1.5rem;
  }
`;

const Brand = styled.a`
  align-items: center;
  display: flex;
  flex: 1 1 50vw;

  @media screen and (min-width: ${tabletMin}) {
    background: transparent;
    flex: 0 1 auto;
    justify-content: space-between;
  }

  &,
  &:active,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const Logo = styled.div`
  display: block;
  flex: 1 1 50%;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Project = styled.em`
  display: block;
  flex: 1 1 50%;
  font-size: 1.25rem;
  font-style: normal;
  line-height: 1.5rem;
  padding: 0 1.5rem;

  @media screen and (min-width: ${tabletMin}) {
    border-left: 1px solid rgb(255, 255, 255);
    font-size: 1rem;
    line-height: 2.5rem;
    margin: 0 0 0 1.5rem;
    padding: 0 0 0 1.5rem;
  }
`;

export default class Headband extends Component {
    render() {
        const { children, appName, ...props } =  this.props;

        return (
            <Header {...props} role="banner">
                <Brand href="/" aria-label="Home" rel="index">
                    <MediaView maxWidth={breakpoints['tablet']}>
                        <Logo>
                          <EquisoftIco />
                        </Logo>
                    </MediaView>

                    <MediaView minWidth={breakpoints['tablet']}>
                        <Logo>
                            <EquisoftLogo />
                        </Logo>
                    </MediaView>

                    <Project>{appName}</Project>
                </Brand>

                <div>
                    {children}
                </div>
            </Header>
        );
    }
}
