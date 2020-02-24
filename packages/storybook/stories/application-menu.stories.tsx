import { ApplicationMenu } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default {
    title: 'Application Menu',
    component: ApplicationMenu,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

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
            <p>Hello world</p>
    </ApplicationMenu>
);

export const withAppName = () => (
    <ApplicationMenu appName="analyze" routerLink={Link} mobileDrawerContent={drawerContent}>
            <p>Hello world</p>
    </ApplicationMenu>
);
