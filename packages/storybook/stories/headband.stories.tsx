import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Headband } from '@equisoft/design-elements-react';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'Headband',
    component: Headband,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

const StyledDiv = styled.div`
    display: flex;
`;

const drawerContent = (
    <div style={{ padding: '16px' }}>
        <h2>Section 1</h2>
        <hr/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, accusamus.</p>
        <h2>Section 2</h2>
        <hr/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, accusamus.</p>
    </div>
);

export const equisoftDefault = () => (
    <Headband routerLink={Link} mobileDrawerContent={drawerContent}>
        <StyledDiv>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
        </StyledDiv>
    </Headband>
);
