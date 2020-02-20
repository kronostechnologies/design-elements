import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styled from 'styled-components';

import { ApplicationMenu } from '@equisoft/design-elements-react';

export default {
    title: 'Application Menu',
    component: ApplicationMenu,
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

export const normal = () => (
    <ApplicationMenu routerLink={Link} mobileDrawerContent={drawerContent}>
        <StyledDiv>
            <p>Hello world</p>
            <p>Hello world</p>
            <p>Hello world</p>
        </StyledDiv>
    </ApplicationMenu>
);
